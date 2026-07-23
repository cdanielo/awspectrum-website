import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import type { CreateContactDto } from './dto/create-contact.dto';
import { ContactService } from './contact.service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { CreateContactSchema } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async submit(@Body(new ZodValidationPipe(CreateContactSchema)) body: CreateContactDto) {
    return this.contactService.submit(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.contactService.findAll();
  }
}
