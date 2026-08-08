import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class CommunityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args?: Prisma.CommunityProjectFindManyArgs) {
    return this.prisma.communityProject.findMany(args);
  }

  async count() {
    return this.prisma.communityProject.count();
  }

  async findById(id: string) {
    return this.prisma.communityProject.findUnique({ where: { id } });
  }

  async create(data: Prisma.CommunityProjectCreateInput) {
    return this.prisma.communityProject.create({ data });
  }

  async update(id: string, data: Prisma.CommunityProjectUpdateInput) {
    return this.prisma.communityProject.update({ where: { id }, data });
  }
}
