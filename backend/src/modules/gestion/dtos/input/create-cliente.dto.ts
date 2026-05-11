import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Ezequiel' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre!: string;

  @ApiProperty({ example: '+541112345678' })
  @IsPhoneNumber('AR', {
    message: 'El teléfono ingresado no es un número válido para Argentina',
  })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  telefono!: string;

  @ApiProperty({ example: 'grupoal@example.com' })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  emails!: string;
}
