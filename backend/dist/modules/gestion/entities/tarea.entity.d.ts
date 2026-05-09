import { Estados_Tareas } from '../enums/estados-tareas.enum';
import { Proyecto } from './proyecto.entity';
export declare class Tarea {
    id: number;
    descripcion: string;
    estado: Estados_Tareas;
    proyecto: Proyecto;
}
