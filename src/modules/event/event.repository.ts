import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import type { CreateEventDto } from './dto/create-event.dto';
import type { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: Prisma.EventFindManyArgs) {
    return this.prisma.event.findMany(args);
  }

  async count(where?: Record<string, unknown>) {
    return this.prisma.event.count({ where: where as any });
  }

  async findBySlug(slug: string) {
    return this.prisma.event.findUnique({ where: { slug } });
  }

  async findById(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async create(data: CreateEventDto) {
    return this.prisma.event.create({ data: data as any });
  }

  async update(id: string, data: UpdateEventDto) {
    return this.prisma.event.update({ where: { id }, data: data as any });
  }
}
