import { RolUsuarioEnum } from '../../enums/rol-usuario.enum';
import { EstadosUsuariosEnum } from '../../enums/estados-usuarios.enum';

export class ListUsuarioDto {
  id!: number;
  nombre!: string;
  estado!: EstadosUsuariosEnum;
  rol!: RolUsuarioEnum;
}
