import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { RolUsuarioEnum } from '../../enums/rol-usuario.enum';
import { ApiProperty } from "@nestjs/swagger"

export class CrearUsuarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La clave es obligatoria.' })
  @MinLength(6, { message: 'La clave debe tener al menos 6 caracteres.' })
  clave!: string;

  @ApiProperty()
  @IsEnum(RolUsuarioEnum)
  @IsOptional()
  rol?: RolUsuarioEnum;
}