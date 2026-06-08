import { InjectRepository } from '@nestjs/typeorm';
import { CreateProyectoDto } from '../dtos/input/create-proyecto.dto';
import { Proyecto } from '../entities/proyecto.entity';
import { Repository, In, FindOptionsWhere } from 'typeorm';
import { EstadosProyectosEnum } from '../enums/estados-proyectos.enum';
import { UpdateProyectoDto } from '../dtos/input/update-proyecto.dto';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListProyectoDTO } from '../dtos/output/list-proyecto.dto';
import { ProyectoDTO } from '../dtos/output/proyecto.dto';
import { ListTareaDTO } from '../dtos/output/list-tarea.dto';
import { ClientesService } from './clientes.service';
import { PdfService } from './pdf.service';
import { ListClienteDTO } from '../dtos/output/list-cliente.dto';
import { Tarea } from '../entities/tarea.entity';
import { Estados_Tareas } from '../enums/estados-tareas.enum';
import { HistorialService } from '../../historial/services/historial.service';
import {
  AccionTipoEnum,
  EntidadTipoEnum,
} from '../../historial/entities/historial-cambio.entity';
import { error } from 'console';
import PDFDocument from 'pdfkit';
import type { Response } from 'express';

// la forma del objeto que viene del JWT
interface UsuarioActivo {
  sub: number;
  nombre: string;
  rol: string;
}

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly repository: Repository<Proyecto>,
    @Inject(forwardRef(() => ClientesService))
    private readonly clientesService: ClientesService,
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    private readonly historialService: HistorialService, // ← NUEVO
    private readonly pdfService: PdfService,
  ) {}

  async crearProyecto(
    dto: CreateProyectoDto,
    usuarioActivo: UsuarioActivo,
  ): Promise<{ id: number }> {
    const proyecto: Proyecto = this.repository.create(dto);
    proyecto.estado = EstadosProyectosEnum.ACTIVO;

    if (dto.idCliente) {
      const clienteActivo: boolean =
        await this.clientesService.existeClienteActivoPorId(dto.idCliente);

      if (!clienteActivo) {
        throw new BadRequestException(
          'Se debe especificar un cliente activo para el proyecto',
        );
      }
    }

    await this.repository.save(proyecto);

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.PROYECTO,
      entidadId: proyecto.id,
      accion: AccionTipoEnum.CREAR,
      usuarioNombre: usuarioActivo.nombre,
      descripcion: `${usuarioActivo.nombre} creó el proyecto "${proyecto.nombre}"`,
    });

    return { id: proyecto.id };
  }

  async actualizarProyecto(
    id: number,
    dto: UpdateProyectoDto,
    usuarioActivo: UsuarioActivo,
  ): Promise<void> {
    const proyecto: Proyecto | null = await this.repository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!proyecto) {
      throw new BadRequestException('Proyecto no encontrado');
    }

    if (dto.idCliente) {
      const clienteActivo: boolean =
        await this.clientesService.existeClienteActivoPorId(dto.idCliente);

      if (!clienteActivo) {
        throw new BadRequestException(
          'Se debe especificar un cliente activo para el proyecto',
        );
      }
    }

    await this.validarCambioDeEstado(proyecto, dto);

    const nombreAnterior = proyecto.nombre;

    this.repository.merge(proyecto, dto);

    await this.repository.save(proyecto);

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.PROYECTO,
      entidadId: proyecto.id,
      accion: AccionTipoEnum.MODIFICAR,
      usuarioNombre: usuarioActivo.nombre,
      descripcion: `${usuarioActivo.nombre} modificó el proyecto "${nombreAnterior}"`,
    });
  }

  async obtenerProyectos(
    estado?: EstadosProyectosEnum,
  ): Promise<ListProyectoDTO[]> {
    const whereCondition: FindOptionsWhere<Proyecto> = {};

    if (estado) {
      whereCondition.estado = estado;
    }

    const proyectos: Proyecto[] = await this.repository.find({
      where: whereCondition,
      relations: ['cliente'],
      order: { id: 'ASC' },
    });

    const dtoList: ListProyectoDTO[] = [];

    for (const p of proyectos) {
      const dto = new ListProyectoDTO();
      dto.id = p.id;
      dto.nombre = p.nombre;
      dto.estado = p.estado;

      if (p.cliente) {
        dto.cliente = new ListClienteDTO();
        dto.cliente.id = p.cliente.id;
        dto.cliente.nombre = p.cliente.nombre;
        dto.cliente.estado = p.cliente.estado;
      }
      dtoList.push(dto);
    }

    return dtoList;
  }

  async obtenerProyecto(id: number): Promise<ProyectoDTO> {
    const proyecto: Proyecto | null = await this.repository.findOne({
      where: { id },
      relations: ['cliente', 'tareas'],
      order: { tareas: { id: 'ASC' } },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    const dto = new ProyectoDTO();
    dto.nombre = proyecto.nombre;
    dto.estado = proyecto.estado;
    if (proyecto.cliente) {
      dto.cliente = proyecto.cliente.nombre;
    }
    const tareas: ListTareaDTO[] = [];
    for (const t of proyecto.tareas) {
      const tareaDto = new ListTareaDTO();
      tareaDto.id = t.id;
      tareaDto.descripcion = t.descripcion;
      tareaDto.estado = t.estado;
      tareas.push(tareaDto);
    }

    dto.tareas = tareas;

    return dto;
  }

  async existeProyectoPorIdCliente(idCliente: number): Promise<boolean> {
    const existe: boolean = await this.repository.exists({
      where: {
        cliente: { id: idCliente },
        estado: In([
          EstadosProyectosEnum.ACTIVO,
          EstadosProyectosEnum.FINALIZADO,
        ]),
      },
    });
    return existe;
  }

  async darBajaProyecto(
    id: number,
    usuarioActivo: UsuarioActivo,
  ): Promise<void> {
    const proyecto: Proyecto | null = await this.repository.findOne({
      where: { id },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (proyecto.estado === EstadosProyectosEnum.BAJA)
      throw new BadRequestException('El proyecto ya esta dado de baja');

    if (proyecto.estado === EstadosProyectosEnum.FINALIZADO)
      throw new BadRequestException('El proyecto se encuentra finalizado');

    proyecto.estado = EstadosProyectosEnum.BAJA;

    await this.repository.save(proyecto);

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.PROYECTO,
      entidadId: proyecto.id,
      accion: AccionTipoEnum.ELIMINAR,
      usuarioNombre: usuarioActivo.nombre,
      descripcion: `${usuarioActivo.nombre} dio de baja el proyecto "${proyecto.nombre}"`,
    });
  }

  /* Funcion para validar cambios de estado en actualizarProyecto */
  /* Baja desde endpoint DELETE, Finalizar desde endpoint PUT */
  private async validarCambioDeEstado(
    proyecto: Proyecto,
    dto: UpdateProyectoDto,
  ): Promise<void> {
    if (!dto.estado) {
      return;
    }

    if (proyecto.estado === EstadosProyectosEnum.BAJA) {
      throw new BadRequestException(
        'No se puede modificar un proyecto dado de BAJA',
      );
    }

    if (
      proyecto.estado === EstadosProyectosEnum.FINALIZADO &&
      dto.estado === EstadosProyectosEnum.ACTIVO
    ) {
      throw new BadRequestException('No se puede reactivar un proyecto');
    }

    if (dto.estado === EstadosProyectosEnum.FINALIZADO) {
      const existenTareasPendientes = await this.tareaRepository.exists({
        where: {
          proyecto: { id: proyecto.id },
          estado: Estados_Tareas.PENDIENTE,
        },
      });

      if (existenTareasPendientes) {
        throw new BadRequestException(
          'No se puede finalizar un proyecto con tareas pendientes',
        );
      }
    }
  }

  async reactivarProyecto(
    id: number,
    usuarioActivo: UsuarioActivo,
  ): Promise<void> {
    const proyecto: Proyecto | null = await this.repository.findOne({
      where: { id },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (proyecto.estado !== EstadosProyectosEnum.BAJA) {
      throw new BadRequestException(
        'Solo se pueden reactivar proyectos dados de baja',
      );
    }

    proyecto.estado = EstadosProyectosEnum.ACTIVO;

    await this.repository.save(proyecto);

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.PROYECTO,
      entidadId: proyecto.id,
      accion: AccionTipoEnum.REACTIVAR,
      usuarioNombre: usuarioActivo.nombre,
      descripcion: `${usuarioActivo.nombre} reactivó el proyecto "${proyecto.nombre}"`,
    });
  }

  async generarReporteProyectos(response: Response): Promise<void> {
    const proyectos = await this.repository.find({
      relations: ['cliente', 'tareas'],
      order: { id: 'ASC' },
    });

    return this.pdfService.generarReporteProyectos(proyectos, response);
  }
}
