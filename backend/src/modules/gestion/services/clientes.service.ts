import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../entitites/cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from '../dtos/input/create-cliente.dto';
import { EstadosClientesEnum } from '../enums/estados-clientes.enum';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async crearCliente(dto: CreateClienteDto): Promise<{ id: number }> {
    const cliente: Cliente = this.clienteRepository.create(dto);

    cliente.estado = EstadosClientesEnum.ACTIVO;

    await this.clienteRepository.save(cliente);

    return { id: cliente.id };
  }
}
