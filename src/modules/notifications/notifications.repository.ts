import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createLog(data: {
    registrationId: string;
    type: NotificationType;
    channel?: string;
  }) {
    return this.prisma.notificationLog.create({
      data: {
        registrationId: data.registrationId,
        type: data.type,
        channel: data.channel ?? 'email',
      },
    });
  }

  async hasLog(registrationId: string, type: NotificationType) {
    const log = await this.prisma.notificationLog.findFirst({
      where: { registrationId, type },
    });
    return !!log;
  }

  async findRegistrationWithEvent(registrationId: string) {
    return this.prisma.eventRegistration.findUnique({
      where: { id: registrationId },
      include: { event: true },
    });
  }

  async findRegistrationsNeedingReminder(
    type: 'REMINDER_24H' | 'REMINDER_1H',
    start: Date,
    end: Date,
  ) {
    return this.prisma.eventRegistration.findMany({
      where: {
        status: 'CONFIRMED' as any,
        event: {
          startDate: { gte: start, lte: end },
        },
        notifications: {
          none: { type },
        },
      },
      include: { event: true },
    });
  }
}
