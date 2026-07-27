import { IsString, IsEmail, IsEnum, IsOptional, IsObject, MinLength } from 'class-validator';
import { RegistrationRole } from '@prisma/client';

export class CreateRegistrationDto {
  @IsEnum(RegistrationRole)
  role!: RegistrationRole;

  @IsString()
  @MinLength(1)
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsObject()
  formData?: Record<string, unknown>;
}
