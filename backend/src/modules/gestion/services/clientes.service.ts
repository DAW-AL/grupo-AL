import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../entities/cliente.entity';
import { CreateClienteDto } from '../dtos/input/create-cliente.dto';
import { EstadosClientesEnum } from '../enums/estados-clientes.enum';
import { UpdateClienteDto } from '../dtos/input/update-cliente.dto';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ListClienteDTO } from '../dtos/output/list-cliente.dto';
import {
  BadRequestException,
  forwardRef,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { HistorialService } from '../../historial/services/historial.service';
import { AccionTipoEnum, EntidadTipoEnum } from '../../historial/entities/historial-cambio.entity';


interface UsuarioActivo {
  sub: number;
  nombre: string;
  rol: string;
}

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private readonly repository: Repository<Cliente>,
    @Inject(forwardRef(() => ProyectosService))
    private readonly proyectosService: ProyectosService,
    private readonly historialService: HistorialService, 
  ) {}

  async crearCliente(dto: CreateClienteDto, usuarioActivo: UsuarioActivo): Promise<{ id: number }> {
    const cliente: Cliente = this.repository.create(dto);
    cliente.estado = EstadosClientesEnum.ACTIVO;
    await this.repository.save(cliente);


  await this.historialService.registrar({
    entidad: EntidadTipoEnum.CLIENTE,
    entidadId: cliente.id,
    accion: AccionTipoEnum.CREAR,
    usuarioNombre: usuarioActivo.nombre,
    descripcion: `${usuarioActivo.nombre} creó el cliente "${cliente.nombre}"`,
  });

    return { id: cliente.id };
  }

  async actualizarCliente(
    id: number,
    dto: UpdateClienteDto, usuarioActivo: UsuarioActivo
  ): Promise<{ id: number; nombre: string; email: string; telefono: string }> {
    const cliente: Cliente | null = await this.repository.findOneBy({ id });

    if (!cliente) {
      throw new BadRequestException('Cliente no encontrado');
    }

    if (cliente.estado === EstadosClientesEnum.BAJA) {
      throw new BadRequestException(
        'No se pueden actualizar los datos de un cliente que se encuentra en estado BAJA',
      );
    }

    const nombreAnterior = cliente.nombre;  

    this.repository.merge(cliente, dto);
    await this.repository.save(cliente);

  await this.historialService.registrar({
    entidad: EntidadTipoEnum.CLIENTE,
    entidadId: cliente.id,
    accion: AccionTipoEnum.MODIFICAR,
    usuarioNombre: usuarioActivo.nombre,
    descripcion: `${usuarioActivo.nombre} modificó el cliente "${nombreAnterior}"`,
  });
    
    return {
      id: cliente.id,
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
    };
  }

  async obtenerClientes(
    estado: EstadosClientesEnum,
  ): Promise<ListClienteDTO[]> {
    const whereCondition: FindOptionsWhere<ListClienteDTO> = {};

    if (estado) {
      whereCondition.estado = estado;
    }

    const clientes: Cliente[] = await this.repository.find({
      select: {
        id: true,
        nombre: true,
        telefono: true,
        email: true,
        estado: true,
      },
      order: { id: 'ASC' },
      where: whereCondition,
    });

    const dtoList: ListClienteDTO[] = [];

    for (const c of clientes) {
      const dto = new ListClienteDTO();
      dto.id = c.id;
      dto.nombre = c.nombre;
      dto.email = c.email;
      dto.telefono = c.telefono;
      dto.estado = c.estado;
      dtoList.push(dto);
    }

    return dtoList;
  }

  async darDeBaja(
    id: number,
    usuarioActivo: UsuarioActivo
  ): Promise<{ id: number; nombre: string; estado: EstadosClientesEnum }> {
    const cliente = await this.repository.findOneBy({ id });
    if (!cliente) throw new BadRequestException('Cliente no encontrado');

    if (cliente.estado === EstadosClientesEnum.BAJA) {
      throw new BadRequestException(
        'El cliente ya se encuentra en estado BAJA',
      );
    }
    const tieneProyectos =
      await this.proyectosService.existeProyectoPorIdCliente(id);

    if (tieneProyectos) {
      throw new BadRequestException(
        'No se puede dar de baja: el cliente tiene proyectos registrados.',
      );
    }

    cliente.estado = EstadosClientesEnum.BAJA;
    await this.repository.save(cliente);

  await this.historialService.registrar({
    entidad: EntidadTipoEnum.CLIENTE,
    entidadId: cliente.id,
    accion: AccionTipoEnum.ELIMINAR,
    usuarioNombre: usuarioActivo.nombre,
    descripcion: `${usuarioActivo.nombre} dio de baja el cliente "${cliente.nombre}"`,
  });

    return {
      id: cliente.id,
      nombre: cliente.nombre,
      estado: cliente.estado,
    };
  }

  async reactivarCliente(
    id: number,
    usuarioActivo: UsuarioActivo
  ): Promise<{ id: number; nombre: string; estado: EstadosClientesEnum }> {
    const cliente = await this.repository.findOneBy({ id });
    if (!cliente) throw new BadRequestException('Cliente no encontrado');

    if (cliente.estado === EstadosClientesEnum.ACTIVO) {
      throw new BadRequestException(
        'El cliente ya se encuentra en estado ACTIVO',
      );
    }

    cliente.estado = EstadosClientesEnum.ACTIVO;
    await this.repository.save(cliente);

  await this.historialService.registrar({
    entidad: EntidadTipoEnum.CLIENTE,
    entidadId: cliente.id,
    accion: AccionTipoEnum.MODIFICAR,
    usuarioNombre: usuarioActivo.nombre,
    descripcion: `${usuarioActivo.nombre} reactivó el cliente "${cliente.nombre}"`,
  });

    return {
      id: cliente.id,
      nombre: cliente.nombre,
      estado: cliente.estado,
    };
  }

  async existeClienteActivoPorId(id: number): Promise<boolean> {
    const existe: boolean = await this.repository.exists({
      where: { id, estado: EstadosClientesEnum.ACTIVO },
    });
    return existe;
  }

  async obtenerCliente(id: number) {
    const cliente = await this.repository.findOne({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException('El cliente no existe');
    }

    return cliente;
  }
}
