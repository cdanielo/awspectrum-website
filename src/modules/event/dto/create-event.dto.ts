import { IsString, IsOptional, IsBoolean, IsInt, IsDateString, IsEnum, Min, MaxLength } from 'class-validator';
import { EventStatus } from '@prisma/client';

export class CreateEventDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsString()
  @MaxLength(255)
  slug!: string;

  @IsString()
  description!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsBoolean()
  isVirtual?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}
