import { IsOptional, IsEnum } from 'class-validator';
import { RegistrationRole, RegistrationStatus } from '@prisma/client';

export class RegistrationQueryDto {
  @IsOptional()
  @IsEnum(RegistrationRole)
  role?: RegistrationRole;

  @IsOptional()
  @IsEnum(RegistrationStatus)
  status?: RegistrationStatus;
}
