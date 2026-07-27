import { Body, Controller, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { MerchService } from './merch.service';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';

@Controller('merch')
export class MerchController {
  constructor(private readonly merchService: MerchService) {}

  @Get()
  async findAll() {
    return this.merchService.findAllActive();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async create(@Body() body: CreateMerchDto) {
    return this.merchService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() body: UpdateMerchDto) {
    return this.merchService.update(id, body);
  }
}
