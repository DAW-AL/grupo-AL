import { Cliente } from '../entitites/cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from '../dtos/input/create-cliente.dto';
export declare class ClientesService {
    private readonly clienteRepository;
    constructor(clienteRepository: Repository<Cliente>);
    crearCliente(dto: CreateClienteDto): Promise<{
        id: number;
    }>;
}
