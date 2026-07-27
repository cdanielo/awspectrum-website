import { Injectable, NotFoundException } from '@nestjs/common';
import { CommunityRepository } from './community.repository';
import type { CreateCommunityProjectDto } from './dto/create-community-project.dto';
import type { UpdateCommunityProjectDto } from './dto/update-community-project.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly communityRepository: CommunityRepository) {}

  async findAll() {
    return this.communityRepository.findMany({
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async create(dto: CreateCommunityProjectDto) {
    return this.communityRepository.create(dto);
  }

  async update(id: string, dto: UpdateCommunityProjectDto) {
    const existing = await this.communityRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Proyecto no encontrado');
    }
    return this.communityRepository.update(id, dto);
  }
}
