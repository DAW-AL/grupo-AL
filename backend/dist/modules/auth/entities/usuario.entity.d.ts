import { EstadosUsuariosEnum } from '../enums/estados-usuarios.enum';
import { RolUsuarioEnum } from '../enums/rol-usuario.enum';
export declare class Usuario {
    id: number;
    nombre: string;
    clave: string;
    estado: EstadosUsuariosEnum;
    rol: RolUsuarioEnum;
}
