import { Proyecto } from '../entities/proyecto.entity';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Tarea } from '../entities/tarea.entity';
export declare class EstadisticasService {
    private readonly proyectoRepository;
    private readonly clienteRepository;
    private readonly tareaRepository;
    constructor(proyectoRepository: Repository<Proyecto>, clienteRepository: Repository<Cliente>, tareaRepository: Repository<Tarea>);
    getProyectos(): Promise<Proyecto[]>;
    getClientes(): Promise<Cliente[]>;
    getTareas(): Promise<Tarea[]>;
    findAll(): Promise<{
        proyecto: {};
        cliente: {};
        tarea: {};
    }>;
}
