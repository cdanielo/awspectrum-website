import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { RegistrationStatus, EventStatus, Prisma } from '@prisma/client';
import { RegistrationRepository } from './registration.repository';
import { EventRepository } from '../event/event.repository';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { RegistrationQueryDto } from './dto/registration-query.dto';

const MAX_FORM_DATA_BYTES = 10 * 1024;

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

    if (dto.formData) {
      const size = Buffer.byteLength(JSON.stringify(dto.formData), 'utf8');
      if (size > MAX_FORM_DATA_BYTES) {
        throw new BadRequestException('formData excede el tamaño máximo permitido');
      }
    }

    const baseData: Omit<Prisma.EventRegistrationUncheckedCreateInput, 'eventId' | 'status'> = {
      role: dto.role,
      name: dto.name.trim(),
      email: dto.email.trim().toLowerCase(),
      formData: dto.formData
        ? (dto.formData as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    };

    try {
      let registration;
      if (event.capacity) {
        registration = await this.registrationRepository.createWithCapacityControl(
          eventId,
          event.capacity,
          baseData,
        );
      } else {
        registration = await this.registrationRepository.create({
          ...baseData,
          eventId,
          status: RegistrationStatus.CONFIRMED,
        });
      }

      if (registration.status === RegistrationStatus.CONFIRMED) {
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
    const where: Prisma.EventRegistrationWhereInput = { eventId };
    if (query.role) where.role = query.role;
    if (query.status) where.status = query.status;

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.registrationRepository.findMany(where, skip, limit),
      this.registrationRepository.countByEvent(eventId),
    ]);
    return { data, total, page, limit };
  }

  async updateStatus(id: string, status: RegistrationStatus) {
    const registration = await this.registrationRepository.findById(id);
    if (!registration) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    return this.registrationRepository.update(id, { status });
  }
}
