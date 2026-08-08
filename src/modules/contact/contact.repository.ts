import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateContactDto) {
    return this.prisma.contactSubmission.create({ data });
  }

  async findAll(skip: number, take: number) {
    return this.prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  async count() {
    return this.prisma.contactSubmission.count();
  }
}
