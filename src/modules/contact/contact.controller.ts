import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactQueryDto } from './dto/contact-query.dto';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(ThrottlerGuard)
  submit(@Body() body: CreateContactDto) {
    return this.contactService.submit(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll(@Query() query: ContactQueryDto) {
    return this.contactService.findAll(query.page, query.limit);
  }
}
