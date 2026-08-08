import { Injectable, NotFoundException } from '@nestjs/common';
import { MerchRepository } from './merch.repository';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';

@Injectable()
export class MerchService {
  constructor(private readonly merchRepository: MerchRepository) {}

  async findAllActive(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.merchRepository.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.merchRepository.count({ isActive: true }),
    ]);
    return { data, total, page, limit };
  }

  async create(dto: CreateMerchDto) {
    return this.merchRepository.create(dto);
  }

  async update(id: string, dto: UpdateMerchDto) {
    const existing = await this.merchRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Producto no encontrado');
    }
    return this.merchRepository.update(id, dto);
  }
}
