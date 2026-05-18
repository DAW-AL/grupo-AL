import { Estados_Tareas } from '../../enums/estados-tareas.enum';
import { Proyecto } from '../../entities/proyecto.entity';
export declare class ListTareaDTO {
    id: number;
    descripcion: string;
    estado: Estados_Tareas;
    proyecto: Proyecto;
}
