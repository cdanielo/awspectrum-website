import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Prisma } from '@prisma/client';
import { NotificationsRepository } from './notifications.repository';

const MAX_ATTEMPTS = 3;

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly sesClient: SESClient | null = null;
  private readonly sourceEmail: string;
  private reminderRunning = false;

  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly configService: ConfigService,
  ) {
    this.sourceEmail = this.configService.get<string>('SES_SOURCE_EMAIL')!;
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    const region = this.configService.get<string>('AWS_REGION')!;

    if (accessKeyId && secretAccessKey) {
      this.sesClient = new SESClient({
        region,
        credentials: { accessKeyId, secretAccessKey },
      });
    } else {
      this.logger.warn('AWS SES credentials not configured — emails will be logged only');
    }
  }

  async sendConfirmation(registrationId: string) {
    const registration = await this.notificationsRepository.findRegistrationWithEvent(registrationId);

    if (!registration) {
      this.logger.warn(`Registration ${registrationId} not found for confirmation email`);
      return;
    }

    const subject = `Confirmación de inscripción — ${registration.event.title}`;
    const html = this.buildConfirmationHtml(registration.name, registration.event.title);

    await this.sendWithLog(registration.id, 'CONFIRMATION', registration.email, subject, html);
  }

  @Cron('0 * * * *')
  async sendReminders() {
    if (this.reminderRunning) {
      this.logger.warn('Reminder cron skipped: previous run still in progress');
      return;
    }
    this.reminderRunning = true;
    try {
      const now = new Date();

      await this.sendReminderBatch('REMINDER_24H', new Date(now.getTime() + 23 * 60 * 60 * 1000), new Date(now.getTime() + 24 * 60 * 60 * 1000));
      await this.sendReminderBatch('REMINDER_1H', new Date(now.getTime() + 50 * 60 * 1000), new Date(now.getTime() + 60 * 60 * 1000));
    } finally {
      this.reminderRunning = false;
    }
  }

  private async sendReminderBatch(
    type: 'REMINDER_24H' | 'REMINDER_1H',
    start: Date,
    end: Date,
  ) {
    try {
      const registrations = await this.notificationsRepository.findRegistrationsNeedingReminder(type, start, end);

      for (const registration of registrations) {
        const label = type === 'REMINDER_24H' ? '24 horas' : '1 hora';
        const subject = `Recordatorio: ${registration.event.title} comienza en ${label}`;
        const html = this.buildReminderHtml(registration.name, registration.event.title, registration.event.startDate, label);

        await this.sendWithLog(registration.id, type, registration.email, subject, html);
      }
    } catch (error) {
      this.logger.error(`Error sending ${type} reminders`, error);
    }
  }

  /**
   * Claim the notification log first (unique constraint dedupes across instances),
   * then send the email with retries. If the claim fails, the email was already sent.
   */
  private async sendWithLog(
    registrationId: string,
    type: 'CONFIRMATION' | 'REMINDER_24H' | 'REMINDER_1H',
    to: string,
    subject: string,
    html: string,
  ) {
    try {
      await this.notificationsRepository.createLog({ registrationId, type });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        this.logger.log(`Skipping ${type} for ${registrationId}: already sent`);
        return;
      }
      throw error;
    }

    try {
      await this.sendEmailWithRetry(to, subject, html);
      this.logger.log(`${type} email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send ${type} email to ${to}`, error);
    }
  }

  private async sendEmailWithRetry(to: string, subject: string, html: string) {
    let attempt = 0;
    while (attempt < MAX_ATTEMPTS) {
      try {
        await this.sendEmail(to, subject, html);
        return;
      } catch (error) {
        attempt += 1;
        if (attempt >= MAX_ATTEMPTS) throw error;
        this.logger.warn(`Email to ${to} failed (attempt ${attempt}/${MAX_ATTEMPTS}), retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
      }
    }
  }

  private async sendEmail(to: string, subject: string, html: string) {
    if (!this.sesClient) {
      this.logger.log(`[DEV] Email to ${to}: ${subject}`);
      return;
    }

    const command = new SendEmailCommand({
      Source: this.sourceEmail,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: { Html: { Data: html, Charset: 'UTF-8' } },
      },
    });

    await this.sesClient.send(command);
  }

  private buildConfirmationHtml(name: string, eventTitle: string): string {
    const safeName = this.escapeHtml(name);
    const safeTitle = this.escapeHtml(eventTitle);
    return `
      <h1>¡Inscripción confirmada!</h1>
      <p>Hola ${safeName},</p>
      <p>Tu inscripción para <strong>${safeTitle}</strong> ha sido confirmada.</p>
      <p>Te enviaremos un recordatorio antes del evento.</p>
      <p>¡Gracias por formar parte de AWSPECTRUM!</p>
    `;
  }

  private buildReminderHtml(name: string, eventTitle: string, startDate: Date, label: string): string {
    const safeName = this.escapeHtml(name);
    const safeTitle = this.escapeHtml(eventTitle);
    return `
      <h1>Recordatorio: ${safeTitle}</h1>
      <p>Hola ${safeName},</p>
      <p>Te recordamos que <strong>${safeTitle}</strong> comienza en ${label}.</p>
      <p><strong>Fecha:</strong> ${startDate.toLocaleString('es-ES')}</p>
      <p>¡Te esperamos!</p>
    `;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
