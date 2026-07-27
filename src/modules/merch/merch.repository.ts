import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import type { CreateMerchDto } from './dto/create-merch.dto';
import type { UpdateMerchDto } from './dto/update-merch.dto';

@Injectable()
export class MerchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args?: Prisma.MerchItemFindManyArgs) {
    return this.prisma.merchItem.findMany(args);
  }

  async findById(id: string) {
    return this.prisma.merchItem.findUnique({ where: { id } });
  }

  async create(data: CreateMerchDto) {
    return this.prisma.merchItem.create({ data: data as any });
  }

  async update(id: string, data: UpdateMerchDto) {
    return this.prisma.merchItem.update({ where: { id }, data: data as any });
  }
}
