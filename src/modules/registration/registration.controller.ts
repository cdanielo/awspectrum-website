import { Body, Controller, Get, Param, Post, Patch, Query, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationStatusDto } from './dto/update-registration-status.dto';
import { RegistrationQueryDto } from './dto/registration-query.dto';

@Controller()
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('events/:eventId/registrations')
  @UseGuards(ThrottlerGuard)
  async create(
    @Param('eventId') eventId: string,
    @Body() body: CreateRegistrationDto,
  ) {
    return this.registrationService.create(eventId, body);
  }

  @Get('events/:eventId/registrations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findByEvent(
    @Param('eventId') eventId: string,
    @Query() query: RegistrationQueryDto,
  ) {
    return this.registrationService.findByEvent(eventId, query);
  }

  @Patch('registrations/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateRegistrationStatusDto,
  ) {
    return this.registrationService.updateStatus(id, body.status);
  }
}
