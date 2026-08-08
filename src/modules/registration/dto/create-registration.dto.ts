import { IsEmail, IsEnum, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { RegistrationRole } from '@prisma/client';

export class CreateRegistrationDto {
  @IsEnum(RegistrationRole)
  role!: RegistrationRole;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name!: string;

  @IsEmail()
  @MaxLength(320)
  email!: string;

  @IsOptional()
  @IsObject()
  formData?: Record<string, unknown>;
}
