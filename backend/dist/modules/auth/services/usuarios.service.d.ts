import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { CrearUsuarioDto } from '../dtos/input/crear-usuario.dto';
import { ModificarUsuarioDto } from '../dtos/input/modificar-usuario.dto';
import { ListUsuarioDto } from '../dtos/output/list-usuario.dto';
import { HistorialService } from '../../historial/services/historial.service';
interface UsuarioActivo {
    sub: number;
    nombre: string;
    rol: string;
}
export declare class UsuariosService {
    private readonly usuariosRepository;
    private readonly historialService;
    constructor(usuariosRepository: Repository<Usuario>, historialService: HistorialService);
    buscarUsuarioActivoPorNombre(nombre: string): Promise<Usuario | null>;
    listarUsuarios(): Promise<ListUsuarioDto[]>;
    consultarUsuario(id: number): Promise<ListUsuarioDto>;
    registrarUsuario(dto: CrearUsuarioDto, usuarioActivo: UsuarioActivo): Promise<{
        id: number;
    }>;
    modificarUsuario(id: number, dto: ModificarUsuarioDto, usuarioActivo: UsuarioActivo): Promise<{
        mensaje: string;
    }>;
}
export {};
