import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { CrearUsuarioDto } from '../dtos/input/crear-usuario.dto';
import { ModificarUsuarioDto } from '../dtos/input/modificar-usuario.dto';
import { ListUsuarioDto } from '../dtos/output/list-usuario.dto';
export declare class UsuariosService {
    private readonly usuariosRepository;
    constructor(usuariosRepository: Repository<Usuario>);
    buscarUsuarioActivoPorNombre(nombre: string): Promise<Usuario | null>;
    listarUsuarios(): Promise<ListUsuarioDto[]>;
    consultarUsuario(id: number): Promise<ListUsuarioDto>;
    registrarUsuario(dto: CrearUsuarioDto): Promise<{
        id: number;
    }>;
    modificarUsuario(id: number, dto: ModificarUsuarioDto): Promise<void>;
}
