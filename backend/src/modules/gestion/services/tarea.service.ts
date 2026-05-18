import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';
import { CrearTareaDto } from '../dtos/input/create-tarea.dto';
import { ActualizarTareaDto } from '../dtos/input/update-tarea.dto';
import { Estados_Tareas } from '../enums/estados-tareas.enum';
import { ProyectosService } from './proyectos.service';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepositorio: Repository<Tarea>,

    private readonly proyectoServices: ProyectosService,
  ) {}

  async findAll(proyecto_id: number): Promise<Tarea[]> {
    await this.proyectoServices.obtenerProyecto(proyecto_id);

    const tareas = await this.tareaRepositorio.find({
      where: { proyecto: { id: proyecto_id } },
      relations: {
        proyecto: true
      }
    });

    return tareas;
  }

  async findOne(id: number): Promise<Tarea> {

    const tarea = await this.tareaRepositorio.findOne({
      where: {
        id: id,
      },
      relations: {
        proyecto: true
      }
    });

    if (!tarea) {
      throw new NotFoundException(`No se encontro tarea con id: ${id}`);
    }

    return tarea;
  }

  async create(proyecto_id: number, crearTarea: CrearTareaDto): Promise<Tarea> {

    const nuevaTarea = this.tareaRepositorio.create({
      ...crearTarea,
      estado: Estados_Tareas.pendiente,
      proyecto: { id: proyecto_id },
    });

    return await this.tareaRepositorio.save(nuevaTarea);
  }

  async update(
    id: number,
    actualizarTarea: ActualizarTareaDto,
  ): Promise<Tarea> {

    const tareaActualizada = await this.tareaRepositorio.update(
      id,
      actualizarTarea,
    );

    if (tareaActualizada.affected === 0) {
      throw new NotFoundException('No se pudo actualizar la tarea');
    }

    return this.findOne(id);
  }

  async delete(id: number): Promise<{ message: string }> {

    const buscarTarea = await this.findOne(id);

    if (buscarTarea.estado === Estados_Tareas.baja) {
      throw new NotFoundException('La tarea ya esta dada de baja');
    }

    const eliminarTarea = await this.tareaRepositorio.update(id, {
      estado: Estados_Tareas.baja,
    });

    if (eliminarTarea.affected === 0) {
      throw new NotFoundException('No se pudo eliminar la tarea');
    }

    return {
      message: `Se elimino la tarea con id: ${id}`,
    };
  }
}
