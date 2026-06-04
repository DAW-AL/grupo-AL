import { CreateProyectoDto } from '../dtos/input/create-proyecto.dto';
import { Proyecto } from '../entities/proyecto.entity';
import { Repository } from 'typeorm';
import { EstadosProyectosEnum } from '../enums/estados-proyectos.enum';
import { UpdateProyectoDto } from '../dtos/input/update-proyecto.dto';
import { ListProyectoDTO } from '../dtos/output/list-proyecto.dto';
import { ProyectoDTO } from '../dtos/output/proyecto.dto';
import { ClientesService } from './clientes.service';
import { PdfService } from './pdf.service';
import { Tarea } from '../entities/tarea.entity';
import { HistorialService } from '../../historial/services/historial.service';
import type { Response } from 'express';
interface UsuarioActivo {
    sub: number;
    nombre: string;
    rol: string;
}
export declare class ProyectosService {
    private readonly repository;
    private readonly clientesService;
    private readonly tareaRepository;
    private readonly historialService;
    private readonly pdfService;
    constructor(repository: Repository<Proyecto>, clientesService: ClientesService, tareaRepository: Repository<Tarea>, historialService: HistorialService, pdfService: PdfService);
    crearProyecto(dto: CreateProyectoDto, usuarioActivo: UsuarioActivo): Promise<{
        id: number;
    }>;
    actualizarProyecto(id: number, dto: UpdateProyectoDto, usuarioActivo: UsuarioActivo): Promise<void>;
    obtenerProyectos(estado?: EstadosProyectosEnum): Promise<ListProyectoDTO[]>;
    obtenerProyecto(id: number): Promise<ProyectoDTO>;
    existeProyectoPorIdCliente(idCliente: number): Promise<boolean>;
    darBajaProyecto(id: number, usuarioActivo: UsuarioActivo): Promise<void>;
    private validarCambioDeEstado;
    reactivarProyecto(id: number, usuarioActivo: UsuarioActivo): Promise<void>;
    generarReporteProyectos(response: Response): Promise<void>;
}
export {};
