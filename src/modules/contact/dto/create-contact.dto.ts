import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsIn(['sponsor', 'speaker', 'community', 'general', 'newsletter'])
  type!: string;

  @IsString()
  @MinLength(1, { message: 'El nombre es requerido' })
  @MaxLength(255)
  name!: string;

  @IsEmail({}, { message: 'Correo inválido' })
  @MaxLength(320)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  interest?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  message?: string;
}
