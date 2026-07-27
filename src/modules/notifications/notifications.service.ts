import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly sesClient: SESClient | null = null;
  private readonly sourceEmail: string;

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

    await this.sendEmail(registration.email, subject, html);
    await this.notificationsRepository.createLog({
      registrationId,
      type: 'CONFIRMATION',
    });

    this.logger.log(`Confirmation email sent to ${registration.email} for ${registration.event.title}`);
  }

  @Cron('0 * * * *')
  async sendReminders() {
    const now = new Date();

    await this.sendReminderBatch('REMINDER_24H', new Date(now.getTime() + 23 * 60 * 60 * 1000), new Date(now.getTime() + 24 * 60 * 60 * 1000));
    await this.sendReminderBatch('REMINDER_1H', new Date(now.getTime() + 50 * 60 * 1000), new Date(now.getTime() + 60 * 60 * 1000));
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

        await this.sendEmail(registration.email, subject, html);
        await this.notificationsRepository.createLog({
          registrationId: registration.id,
          type,
        });

        this.logger.log(`${type} reminder sent to ${registration.email}`);
      }
    } catch (error) {
      this.logger.error(`Error sending ${type} reminders`, error);
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
    return `
      <h1>¡Inscripción confirmada!</h1>
      <p>Hola ${name},</p>
      <p>Tu inscripción para <strong>${eventTitle}</strong> ha sido confirmada.</p>
      <p>Te enviaremos un recordatorio antes del evento.</p>
      <p>¡Gracias por formar parte de AWSPECTRUM!</p>
    `;
  }

  private buildReminderHtml(name: string, eventTitle: string, startDate: Date, label: string): string {
    return `
      <h1>Recordatorio: ${eventTitle}</h1>
      <p>Hola ${name},</p>
      <p>Te recordamos que <strong>${eventTitle}</strong> comienza en ${label}.</p>
      <p><strong>Fecha:</strong> ${startDate.toLocaleString('es-ES')}</p>
      <p>¡Te esperamos!</p>
    `;
  }
}
