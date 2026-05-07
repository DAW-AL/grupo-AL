import { TareaService } from '../services/tarea.service';
import { CrearTareaDto } from '../dtos/input/create-tarea.dto';
import { ActualizarTareaDto } from '../dtos/input/update-tarea.dto';
export declare class TareaController {
    private readonly tareaServicios;
    constructor(tareaServicios: TareaService);
    findAll(proyecto_id: number): Promise<import("../entities/tarea.entity").Tarea[]>;
    findOne(proyecto_id: number, id: number): Promise<import("../entities/tarea.entity").Tarea>;
    create(proyecto_id: number, crearTarea: CrearTareaDto): Promise<import("../entities/tarea.entity").Tarea>;
    update(proyecto_id: number, id: number, actualizarTarea: ActualizarTareaDto): Promise<import("../entities/tarea.entity").Tarea>;
    delete(proyecto_id: number, id: number): Promise<{
        message: string;
    }>;
}
