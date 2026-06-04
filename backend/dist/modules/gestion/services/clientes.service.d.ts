import { Cliente } from '../entities/cliente.entity';
import { CreateClienteDto } from '../dtos/input/create-cliente.dto';
import { EstadosClientesEnum } from '../enums/estados-clientes.enum';
import { UpdateClienteDto } from '../dtos/input/update-cliente.dto';
import { Repository } from 'typeorm';
import { ListClienteDTO } from '../dtos/output/list-cliente.dto';
import { ProyectosService } from './proyectos.service';
import { HistorialService } from '../../historial/services/historial.service';
import { PdfService } from './pdf.service';
import type { Response } from 'express';
interface UsuarioActivo {
    sub: number;
    nombre: string;
    rol: string;
}
export declare class ClientesService {
    private readonly repository;
    private readonly proyectosService;
    private readonly historialService;
    private readonly pdfService;
    constructor(repository: Repository<Cliente>, proyectosService: ProyectosService, historialService: HistorialService, pdfService: PdfService);
    crearCliente(dto: CreateClienteDto, usuarioActivo: UsuarioActivo): Promise<{
        id: number;
    }>;
    actualizarCliente(id: number, dto: UpdateClienteDto, usuarioActivo: UsuarioActivo): Promise<{
        id: number;
        nombre: string;
        email: string;
        telefono: string;
    }>;
    obtenerClientes(estado: EstadosClientesEnum): Promise<ListClienteDTO[]>;
    darDeBaja(id: number, usuarioActivo: UsuarioActivo): Promise<{
        id: number;
        nombre: string;
        estado: EstadosClientesEnum;
    }>;
    reactivarCliente(id: number, usuarioActivo: UsuarioActivo): Promise<{
        id: number;
        nombre: string;
        estado: EstadosClientesEnum;
    }>;
    existeClienteActivoPorId(id: number): Promise<boolean>;
    obtenerCliente(id: number): Promise<Cliente>;
    generarReporteClientes(response: Response): Promise<void>;
}
export {};
