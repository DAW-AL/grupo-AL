import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';
import { CrearTareaDto } from '../dtos/input/create-tarea.dto';
import { ActualizarTareaDto } from '../dtos/input/update-tarea.dto';
import { Estados_Tareas } from '../enums/estados-tareas.enum';
import { ProyectosService } from './proyectos.service';
import { HistorialService } from '../../historial/services/historial.service';
import {
  AccionTipoEnum,
  EntidadTipoEnum,
} from '../../historial/entities/historial-cambio.entity';
import { EstadosProyectosEnum } from '../enums/estados-proyectos.enum';

interface UsuarioActivo {
  sub: number;
  nombre: string;
  rol: string;
}

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepositorio: Repository<Tarea>,

    private readonly proyectoServices: ProyectosService,
    private readonly historialService: HistorialService, // ← NUEVO
  ) {}

  async findAll(proyecto_id: number): Promise<Tarea[]> {
    await this.proyectoServices.obtenerProyecto(proyecto_id);

    const tareas = await this.tareaRepositorio.find({
      where: { proyecto: { id: proyecto_id } },
      relations: {
        proyecto: true,
      },
    });

    return tareas;
  }

  async findOne(id: number): Promise<Tarea> {
    const tarea = await this.tareaRepositorio.findOne({
      where: {
        id: id,
      },
      relations: {
        proyecto: true,
      },
    });

    if (!tarea) {
      throw new NotFoundException(`No se encontro tarea con id: ${id}`);
    }

    return tarea;
  }

  async create(
    proyecto_id: number,
    crearTarea: CrearTareaDto,
    usuarioActivo: UsuarioActivo,
  ): Promise<Tarea> {

    const proyecto = await this.proyectoServices.obtenerProyecto(proyecto_id);
    
    if (proyecto.estado === EstadosProyectosEnum.BAJA) {
        throw new BadRequestException('El proyecto asociado a la tarea esta de baja');
    }

    const nuevaTarea = this.tareaRepositorio.create({
      ...crearTarea,
      estado: Estados_Tareas.PENDIENTE,
      proyecto: { id: proyecto_id },
    });

    const tareaGuardada = await this.tareaRepositorio.save(nuevaTarea); // ← lo guarde en una variable

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.TAREA,
      entidadId: tareaGuardada.id,
      accion: AccionTipoEnum.CREAR,
      usuarioNombre: usuarioActivo.nombre,
      descripcion: `${usuarioActivo.nombre} creó la tarea "${tareaGuardada.descripcion}" en el proyecto ${proyecto_id}`,
    });

    //return await this.tareaRepositorio.save(nuevaTarea);
    return tareaGuardada;
  }

  async update(
    id: number,
    actualizarTarea: ActualizarTareaDto,
    usuarioActivo: UsuarioActivo,
  ): Promise<Tarea | {message: string}> {

    const tareaModificar = await this.tareaRepositorio.findOne({
      where: { id },
      relations: ['proyecto'],
    });

    if (!tareaModificar) {
      throw new NotFoundException('La tarea no existe');
    }

    if (tareaModificar.proyecto.estado === EstadosProyectosEnum.BAJA) {
      throw new BadRequestException('No se puede modificar una tarea cuyo proyecto este de baja');
    }

    //Si viene estado que es baja...
    if (actualizarTarea.estado === Estados_Tareas.BAJA) {
      if (actualizarTarea.descripcion) {
        const tareaActualizada = await this.tareaRepositorio.update(
          id,
          {descripcion: actualizarTarea.descripcion},
        );
        if (tareaActualizada.affected === 0) {
          throw new NotFoundException('No se pudo actualizar la tarea');
        }
      }

      const resultado = await this.delete(id, usuarioActivo);

      return resultado;
    }

    const tareaActualizada = await this.tareaRepositorio.update(
      id,
      actualizarTarea,
    );

    if (tareaActualizada.affected === 0) {
      throw new NotFoundException('No se pudo actualizar la tarea');
    }

    //return this.findOne(id);
    const tarea = await this.findOne(id); //lo guardé en una variable para usarlo en el historial

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.TAREA,
      entidadId: id,
      accion: AccionTipoEnum.MODIFICAR,
      usuarioNombre: usuarioActivo.nombre,
      descripcion: `${usuarioActivo.nombre} modificó la tarea "${tarea.descripcion}"`,
    });

    return tarea;
  }

  //AGREGUE ESTA NUEVA FORMA DE DAR DE ALTA UNA TAREA QUE ESTUVO COMO BAJA
  async reactivarTarea(id: number, usuarioActivo: UsuarioActivo) {
    const tarea = await this.tareaRepositorio.findOne({
      where: { id },
      relations: ['proyecto'],
    });
    if (!tarea) throw new BadRequestException('Tarea no encontrada');

    if (tarea.proyecto.estado === EstadosProyectosEnum.BAJA) {
      throw new BadRequestException('El proyecto asociado a la tarea esta de baja');
    }

    if (tarea.estado === Estados_Tareas.PENDIENTE) {
      throw new BadRequestException('La tarea aun esta en estado pendiente');
    }

    tarea.estado = Estados_Tareas.PENDIENTE;
    await this.tareaRepositorio.save(tarea);

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.TAREA,
      entidadId: tarea.id,
      accion: AccionTipoEnum.MODIFICAR,
      usuarioNombre: usuarioActivo.nombre,
      descripcion: `${usuarioActivo.nombre} reactivó la teare "${tarea.descripcion}"`,
    });

    return {
      id: tarea.id,
      descripcion: tarea.descripcion,
      estado: tarea.estado,
    };
  }

  async delete(
    id: number,
    usuarioActivo: UsuarioActivo,
  ): Promise<{ message: string }> {
    const buscarTarea = await this.findOne(id);

    if (buscarTarea.estado === Estados_Tareas.BAJA) {
      throw new NotFoundException('La tarea ya esta dada de baja');
    }

    const eliminarTarea = await this.tareaRepositorio.update(id, {
      estado: Estados_Tareas.BAJA,
    });

    if (eliminarTarea.affected === 0) {
      throw new NotFoundException('No se pudo eliminar la tarea');
    }

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.TAREA,
      entidadId: id,
      accion: AccionTipoEnum.ELIMINAR,
      usuarioNombre: usuarioActivo.nombre,
      descripcion: `${usuarioActivo.nombre} dio de baja la tarea "${buscarTarea.descripcion}"`,
    });

    return {
      message: `Se elimino la tarea con id: ${id}`,
    };
  }
}
