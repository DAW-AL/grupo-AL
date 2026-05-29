import { TareaService } from '../services/tarea.service';
import { CrearTareaDto } from '../dtos/input/create-tarea.dto';
import { ActualizarTareaDto } from '../dtos/input/update-tarea.dto';
export declare class TareaController {
    private readonly tareaServicios;
    constructor(tareaServicios: TareaService);
    findAll(proyecto_id: number): Promise<import("../entities/tarea.entity").Tarea[]>;
    findOne(id: number): Promise<import("../entities/tarea.entity").Tarea>;
    create(proyecto_id: number, crearTarea: CrearTareaDto, req: any): Promise<import("../entities/tarea.entity").Tarea>;
    update(id: number, actualizarTarea: ActualizarTareaDto, req: any): Promise<import("../entities/tarea.entity").Tarea>;
    delete(id: number, req: any): Promise<{
        message: string;
    }>;
}
