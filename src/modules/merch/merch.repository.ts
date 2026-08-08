import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class MerchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args?: Prisma.MerchItemFindManyArgs) {
    return this.prisma.merchItem.findMany(args);
  }

  async count(where: Prisma.MerchItemWhereInput = {}) {
    return this.prisma.merchItem.count({ where });
  }

  async findById(id: string) {
    return this.prisma.merchItem.findUnique({ where: { id } });
  }

  async create(data: Prisma.MerchItemCreateInput) {
    return this.prisma.merchItem.create({ data });
  }

  async update(id: string, data: Prisma.MerchItemUpdateInput) {
    return this.prisma.merchItem.update({ where: { id }, data });
  }
}
