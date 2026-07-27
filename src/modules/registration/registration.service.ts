import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { RegistrationStatus, EventStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { RegistrationRepository } from './registration.repository';
import { EventRepository } from '../event/event.repository';
import { NotificationsService } from '../notifications/notifications.service';
import type { CreateRegistrationDto } from './dto/create-registration.dto';
import type { RegistrationQueryDto } from './dto/registration-query.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    private readonly eventRepository: EventRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(eventId: string, dto: CreateRegistrationDto) {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }
    if (event.status !== EventStatus.PUBLISHED) {
      throw new BadRequestException('El evento no está abierto para inscripciones');
    }

    let status: RegistrationStatus = RegistrationStatus.CONFIRMED;

    if (dto.role === 'ATTENDEE' && event.capacity) {
      const confirmedCount = await this.registrationRepository.countByEventAndStatus(
        eventId,
        RegistrationStatus.CONFIRMED,
      );
      if (confirmedCount >= event.capacity) {
        status = RegistrationStatus.WAITLISTED;
      }
    }

    try {
      const registration = await this.registrationRepository.create({
        eventId,
        role: dto.role,
        status,
        name: dto.name,
        email: dto.email,
        formData: dto.formData ?? Prisma.JsonNull,
      });

      if (status === RegistrationStatus.CONFIRMED) {
        await this.notificationsService.sendConfirmation(registration.id).catch(() => {});
      }

      return registration;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Ya existe una inscripción con este email y rol para este evento');
      }
      throw error;
    }
  }

  async findByEvent(eventId: string, query: RegistrationQueryDto) {
    const where: any = { eventId };
    if (query.role) where.role = query.role;
    if (query.status) where.status = query.status;

    return this.registrationRepository.findMany(where);
  }

  async updateStatus(id: string, status: RegistrationStatus) {
    const registration = await this.registrationRepository.findById(id);
    if (!registration) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    return this.registrationRepository.update(id, { status });
  }
}
