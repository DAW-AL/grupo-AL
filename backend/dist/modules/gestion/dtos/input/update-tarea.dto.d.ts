import { CrearTareaDto } from './create-tarea.dto';
import { Estados_Tareas } from '../../enums/estados-tareas.enum';
declare const ActualizarTareaDto_base: import("@nestjs/common").Type<Partial<CrearTareaDto>>;
export declare class ActualizarTareaDto extends ActualizarTareaDto_base {
    estado: Estados_Tareas;
}
export {};
