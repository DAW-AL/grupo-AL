import { CreateClienteDto } from '../dtos/input/create-cliente.dto';
import { ListClienteDTO } from '../dtos/output/list-cliente.dto';
import { UpdateClienteDto } from '../dtos/input/update-cliente.dto';
import { EstadosClientesEnum } from '../enums/estados-clientes.enum';
export declare class ClientesController {
    constructor();
    crearCliente(dto: CreateClienteDto): Promise<{
        id: number;
    }>;
    actualizarCliente(id: number, dto: UpdateClienteDto): Promise<void>;
    obtenerClientes(estado: EstadosClientesEnum): Promise<ListClienteDTO[]>;
}
