import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import type { CreateCommunityProjectDto } from './dto/create-community-project.dto';
import type { UpdateCommunityProjectDto } from './dto/update-community-project.dto';

@Injectable()
export class CommunityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args?: Prisma.CommunityProjectFindManyArgs) {
    return this.prisma.communityProject.findMany(args);
  }

  async findById(id: string) {
    return this.prisma.communityProject.findUnique({ where: { id } });
  }

  async create(data: CreateCommunityProjectDto) {
    return this.prisma.communityProject.create({ data: data as any });
  }

  async update(id: string, data: UpdateCommunityProjectDto) {
    return this.prisma.communityProject.update({ where: { id }, data: data as any });
  }
}
