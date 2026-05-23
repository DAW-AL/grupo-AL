import { CreateProyectoDto } from '../dtos/input/create-proyecto.dto';
import { Proyecto } from '../entities/proyecto.entity';
import { Repository } from 'typeorm';
import { UpdateProyectoDto } from '../dtos/input/update-proyecto.dto';
import { ListProyectoDTO } from '../dtos/output/list-proyecto.dto';
import { ProyectoDTO } from '../dtos/output/proyecto.dto';
import { ClientesService } from './clientes.service';
import { Tarea } from '../entities/tarea.entity';
export declare class ProyectosService {
    private readonly repository;
    private readonly clientesService;
    private readonly tareaRepository;
    constructor(repository: Repository<Proyecto>, clientesService: ClientesService, tareaRepository: Repository<Tarea>);
    crearProyecto(dto: CreateProyectoDto): Promise<{
        id: number;
    }>;
    actualizarProyecto(id: number, dto: UpdateProyectoDto): Promise<void>;
    obtenerProyectos(): Promise<ListProyectoDTO[]>;
    obtenerProyecto(id: number): Promise<ProyectoDTO>;
    existeProyectoPorIdCliente(idCliente: number): Promise<boolean>;
    darBajaProyecto(id: number): Promise<void>;
    private validarCambioDeEstado;
}
