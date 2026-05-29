import { UsuariosService } from '../services/usuarios.service';
import { CrearUsuarioDto } from '../dtos/input/crear-usuario.dto';
import { ModificarUsuarioDto } from '../dtos/input/modificar-usuario.dto';
import { ListUsuarioDto } from '../dtos/output/list-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    listarUsuarios(): Promise<ListUsuarioDto[]>;
    consultarUsuario(id: number): Promise<ListUsuarioDto>;
    registrarUsuario(dto: CrearUsuarioDto, req: any): Promise<{
        id: number;
    }>;
    modificarUsuario(id: number, dto: ModificarUsuarioDto, req: any): Promise<{
        mensaje: string;
    }>;
}
