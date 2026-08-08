import { Injectable, NotFoundException } from '@nestjs/common';
import { CommunityRepository } from './community.repository';
import { CreateCommunityProjectDto } from './dto/create-community-project.dto';
import { UpdateCommunityProjectDto } from './dto/update-community-project.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly communityRepository: CommunityRepository) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.communityRepository.findMany({
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.communityRepository.count(),
    ]);
    return { data, total, page, limit };
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
