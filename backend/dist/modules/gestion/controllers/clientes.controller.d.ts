import { CreateClienteDto } from '../dtos/input/create-cliente.dto';
import { ListClienteDTO } from '../dtos/output/list-cliente.dto';
import { UpdateClienteDto } from '../dtos/input/update-cliente.dto';
import { EstadosClientesEnum } from '../enums/estados-clientes.enum';
import { ClientesService } from '../services/clientes.service';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    crearCliente(dto: CreateClienteDto): Promise<{
        id: number;
    }>;
    actualizarDatos(id: number, dto: UpdateClienteDto): Promise<{
        id: number;
        nombre: string;
        email: string;
        telefono: string;
    }>;
    darDeBaja(id: number): Promise<{
        id: number;
        nombre: string;
        estado: EstadosClientesEnum;
    }>;
    reactivarCliente(id: number): Promise<{
        id: number;
        nombre: string;
        estado: EstadosClientesEnum;
    }>;
    obtenerClientes(estado: EstadosClientesEnum): Promise<ListClienteDTO[]>;
    obtenerCliente(id: number): Promise<import("../entities/cliente.entity").Cliente>;
}
