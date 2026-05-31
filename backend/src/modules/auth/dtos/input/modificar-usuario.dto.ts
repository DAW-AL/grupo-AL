import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { RolUsuarioEnum } from '../../enums/rol-usuario.enum';
import { EstadosUsuariosEnum } from '../../enums/estados-usuarios.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ModificarUsuarioDto {
  @ApiProperty({ example: 'usuario' })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'clave' })
  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'La clave debe tener al menos 6 caracteres.' })
  clave?: string;

  @ApiProperty({ example: 'user' })
  @IsEnum(RolUsuarioEnum)
  @IsOptional()
  rol?: RolUsuarioEnum;

  @ApiProperty({ example: 'ACTIVO' })
  @IsEnum(EstadosUsuariosEnum)
  @IsOptional()
  estado?: EstadosUsuariosEnum;
}
