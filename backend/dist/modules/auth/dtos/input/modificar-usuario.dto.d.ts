import { RolUsuarioEnum } from '../../enums/rol-usuario.enum';
import { EstadosUsuariosEnum } from '../../enums/estados-usuarios.enum';
export declare class ModificarUsuarioDto {
    nombre?: string;
    clave?: string;
    rol?: RolUsuarioEnum;
    estado?: EstadosUsuariosEnum;
}
