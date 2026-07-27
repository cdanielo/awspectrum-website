import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { RegistrationStatus } from '@prisma/client';

interface CreateRegistrationData {
  eventId: string;
  role: string;
  status: RegistrationStatus;
  name: string;
  email: string;
  formData: any;
}

@Injectable()
export class RegistrationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRegistrationData) {
    return this.prisma.eventRegistration.create({ data: data as any });
  }

  async findById(id: string) {
    return this.prisma.eventRegistration.findUnique({
      where: { id },
      include: { event: true },
    });
  }

  async findMany(where: any) {
    return this.prisma.eventRegistration.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async countByEventAndStatus(eventId: string, status: RegistrationStatus) {
    return this.prisma.eventRegistration.count({
      where: { eventId, status },
    });
  }

  async update(id: string, data: { status: RegistrationStatus }) {
    return this.prisma.eventRegistration.update({ where: { id }, data });
  }

  async findConfirmedWithEventInWindow(start: Date, end: Date) {
    return this.prisma.eventRegistration.findMany({
      where: {
        status: 'CONFIRMED' as any,
        event: {
          startDate: { gte: start, lte: end },
        },
      },
      include: { event: true },
    });
  }
}
