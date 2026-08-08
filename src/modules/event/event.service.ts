import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { EventStatus } from '@prisma/client';
import { EventRepository } from './event.repository';
import type { CreateEventDto } from './dto/create-event.dto';
import type { UpdateEventDto } from './dto/update-event.dto';
import type { EventQueryDto } from './dto/event-query.dto';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async findAllPublished(query: EventQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      this.eventRepository.findMany({
        where: { status: EventStatus.PUBLISHED },
        orderBy: { startDate: 'asc' },
        skip,
        take: limit,
      }),
      this.eventRepository.count({ status: EventStatus.PUBLISHED }),
    ]);

    return { data: events, total, page, limit };
  }

  async findBySlug(slug: string) {
    const event = await this.eventRepository.findBySlug(slug);
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }
    return event;
  }

  async findPublishedBySlug(slug: string) {
    const event = await this.eventRepository.findBySlug(slug);
    if (!event || event.status !== EventStatus.PUBLISHED) {
      throw new NotFoundException('Evento no encontrado');
    }
    return event;
  }

  async create(dto: CreateEventDto) {
    this.validateDates(new Date(dto.startDate), new Date(dto.endDate));
    await this.ensureSlugUnique(dto.slug);
    return this.eventRepository.create(dto);
  }

  async update(id: string, dto: UpdateEventDto) {
    const existing = await this.eventRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Evento no encontrado');
    }

    if (dto.startDate || dto.endDate) {
      const startDate = dto.startDate ? new Date(dto.startDate) : existing.startDate;
      const endDate = dto.endDate ? new Date(dto.endDate) : existing.endDate;
      this.validateDates(startDate, endDate);
    }

    if (dto.slug && dto.slug !== existing.slug) {
      await this.ensureSlugUnique(dto.slug);
    }

    return this.eventRepository.update(id, dto);
  }

  private validateDates(startDate: Date, endDate: Date) {
    if (endDate <= startDate) {
      throw new BadRequestException('endDate debe ser posterior a startDate');
    }
  }

  private async ensureSlugUnique(slug: string) {
    const existing = await this.eventRepository.findBySlug(slug);
    if (existing) {
      throw new ConflictException('El slug ya está en uso');
    }
  }
}
