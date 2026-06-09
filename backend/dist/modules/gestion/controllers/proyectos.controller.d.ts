import { CreateProyectoDto } from '../dtos/input/create-proyecto.dto';
import { UpdateProyectoDto } from '../dtos/input/update-proyecto.dto';
import { ListProyectoDTO } from '../dtos/output/list-proyecto.dto';
import { ProyectoDTO } from '../dtos/output/proyecto.dto';
import { ProyectosService } from '../services/proyectos.service';
import { EstadosProyectosEnum } from '../enums/estados-proyectos.enum';
import type { Response } from 'express';
export declare class ProyectosController {
    private readonly proyectosService;
    constructor(proyectosService: ProyectosService);
    generarReporte(response: Response): Promise<void>;
    crearProyecto(dto: CreateProyectoDto, req: any): Promise<{
        id: number;
    }>;
    actualizarProyecto(dto: UpdateProyectoDto, id: number, req: any): Promise<void>;
    obtenerProyectos(estado?: EstadosProyectosEnum): Promise<ListProyectoDTO[]>;
    obtenerProyecto(id: number): Promise<ProyectoDTO>;
    darBajaProyecto(id: number, req: any): Promise<void>;
    reactivarProyecto(id: number, req: any): Promise<void>;
}
