import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { CreateUserSchema } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(new ZodValidationPipe(CreateUserSchema)) body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.userService.findAll();
  }
}
