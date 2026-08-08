import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Prisma, RegistrationStatus } from '@prisma/client';

@Injectable()
export class RegistrationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventRegistrationUncheckedCreateInput) {
    return this.prisma.eventRegistration.create({ data });
  }

  async createWithCapacityControl(
    eventId: string,
    capacity: number,
    data: Omit<Prisma.EventRegistrationUncheckedCreateInput, 'eventId' | 'status'>,
  ) {
    return this.prisma.$transaction(
      async (tx) => {
        const confirmedCount = await tx.eventRegistration.count({
          where: { eventId, status: RegistrationStatus.CONFIRMED },
        });
        const status: RegistrationStatus =
          confirmedCount >= capacity
            ? RegistrationStatus.WAITLISTED
            : RegistrationStatus.CONFIRMED;

        return tx.eventRegistration.create({
          data: { ...data, eventId, status },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }

  async findById(id: string) {
    return this.prisma.eventRegistration.findUnique({
      where: { id },
      include: { event: true },
    });
  }

  async findMany(where: Prisma.EventRegistrationWhereInput, skip?: number, take?: number) {
    return this.prisma.eventRegistration.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  async countByEvent(eventId: string) {
    return this.prisma.eventRegistration.count({ where: { eventId } });
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
        status: RegistrationStatus.CONFIRMED,
        event: {
          startDate: { gte: start, lte: end },
        },
      },
      include: { event: true },
    });
  }
}
