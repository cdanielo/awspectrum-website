import { Body, Controller, Get, Param, Post, Patch, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CommunityService } from './community.service';
import { CommunityQueryDto } from './dto/community-query.dto';
import { CreateCommunityProjectDto } from './dto/create-community-project.dto';
import { UpdateCommunityProjectDto } from './dto/update-community-project.dto';

@Controller('community-projects')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  findAll(@Query() query: CommunityQueryDto) {
    return this.communityService.findAll(query.page, query.limit);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async create(@Body() body: CreateCommunityProjectDto) {
    return this.communityService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() body: UpdateCommunityProjectDto) {
    return this.communityService.update(id, body);
  }
}
