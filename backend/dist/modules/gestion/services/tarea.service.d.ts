import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';
import { CrearTareaDto } from '../dtos/input/create-tarea.dto';
import { ActualizarTareaDto } from '../dtos/input/update-tarea.dto';
import { ProyectosService } from './proyectos.service';
export declare class TareaService {
    private readonly tareaRepositorio;
    private readonly proyectoServices;
    constructor(tareaRepositorio: Repository<Tarea>, proyectoServices: ProyectosService);
    findAll(proyecto_id: number): Promise<Tarea[]>;
    findOne(id: number): Promise<Tarea>;
    create(proyecto_id: number, crearTarea: CrearTareaDto): Promise<Tarea>;
    update(id: number, actualizarTarea: ActualizarTareaDto): Promise<Tarea>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
