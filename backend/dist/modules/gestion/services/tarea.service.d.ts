import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';
import { CrearTareaDto } from '../dtos/input/create-tarea.dto';
import { ActualizarTareaDto } from '../dtos/input/update-tarea.dto';
import { ProyectosService } from './proyectos.service';
import { HistorialService } from '../../historial/services/historial.service';
interface UsuarioActivo {
    sub: number;
    nombre: string;
    rol: string;
}
export declare class TareaService {
    private readonly tareaRepositorio;
    private readonly proyectoServices;
    private readonly historialService;
    constructor(tareaRepositorio: Repository<Tarea>, proyectoServices: ProyectosService, historialService: HistorialService);
    findAll(proyecto_id: number): Promise<Tarea[]>;
    findOne(id: number): Promise<Tarea>;
    create(proyecto_id: number, crearTarea: CrearTareaDto, usuarioActivo: UsuarioActivo): Promise<Tarea>;
    update(id: number, actualizarTarea: ActualizarTareaDto, usuarioActivo: UsuarioActivo): Promise<Tarea>;
    delete(id: number, usuarioActivo: UsuarioActivo): Promise<{
        message: string;
    }>;
}
export {};
