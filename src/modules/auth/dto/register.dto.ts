import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MaxLength(320)
  email!: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(128)
  password!: string;

  @IsString()
  @MinLength(1, { message: 'El nombre es requerido' })
  @MaxLength(255)
  firstName!: string;

  @IsString()
  @MinLength(1, { message: 'El apellido es requerido' })
  @MaxLength(255)
  lastName!: string;
}
