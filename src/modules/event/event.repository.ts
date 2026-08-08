import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: Prisma.EventFindManyArgs) {
    return this.prisma.event.findMany(args);
  }

  async count(where: Prisma.EventWhereInput = {}) {
    return this.prisma.event.count({ where });
  }

  async findBySlug(slug: string) {
    return this.prisma.event.findUnique({ where: { slug } });
  }

  async findById(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async create(data: Prisma.EventCreateInput) {
    return this.prisma.event.create({ data });
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    return this.prisma.event.update({ where: { id }, data });
  }
}
