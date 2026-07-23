import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSchema } from './dto/login.dto';
import { RegisterSchema } from './dto/register.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(new ZodValidationPipe(RegisterSchema)) body: unknown) {
    return this.authService.register(body as any);
  }

  @Post('login')
  async login(@Body(new ZodValidationPipe(LoginSchema)) body: unknown) {
    return this.authService.login(body as any);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me() {
    return { message: 'Autenticado' };
  }
}
