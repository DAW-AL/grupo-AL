import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { RolUsuarioEnum } from '../../enums/rol-usuario.enum';
import { EstadosUsuariosEnum } from '../../enums/estados-usuarios.enum';
import { ApiProperty } from "@nestjs/swagger"

export class ModificarUsuarioDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty()  
  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'La clave debe tener al menos 6 caracteres.' })
  clave?: string;

  @ApiProperty()  
  @IsEnum(RolUsuarioEnum)
  @IsOptional()
  rol?: RolUsuarioEnum;

  @ApiProperty()
  @IsEnum(EstadosUsuariosEnum)
  @IsOptional()
  estado?: EstadosUsuariosEnum;
}