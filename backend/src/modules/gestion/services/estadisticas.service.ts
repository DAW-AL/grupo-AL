import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from '../entities/proyecto.entity';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Tarea } from '../entities/tarea.entity';
import { EstadosProyectosEnum } from '../enums/estados-proyectos.enum';
import { EstadosClientesEnum } from '../enums/estados-clientes.enum';
import { Estados_Tareas } from '../enums/estados-tareas.enum';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) {}

  async getProyectos() {
    const proyectos = await this.proyectoRepository.find();

    return proyectos;
  }

  async getClientes() {
    const clientes = await this.clienteRepository.find();

    return clientes;
  }

  async getTareas() {
    const tareas = await this.tareaRepository.find();

    return tareas;
  }

  async findAll() {
    let proyecto = {};
    let cliente = {};
    let tarea = {};

    //NUMEROS:
    // Numeros de proyectos (incluye bajas)
    const proyectos = await this.getProyectos();
    const totalProyectosActivos = proyectos.filter(
      (v) => v.estado === EstadosProyectosEnum.ACTIVO,
    );
    const totalProyectosfinalizados = proyectos.filter(
      (v) => v.estado === EstadosProyectosEnum.FINALIZADO,
    );
    const totalProyectosBajas = proyectos.filter(
      (v) => v.estado === EstadosProyectosEnum.BAJA,
    );
    proyecto['numeros'] = {
      total: proyectos.length,
      totalActivos: totalProyectosActivos.length,
      totalFinalizados: totalProyectosfinalizados.length,
      totalBajas: totalProyectosBajas.length,
    };

    // Numeros de clientes activos y bajas
    const clientes = await this.getClientes();
    const totalClientesActivos = clientes.filter(
      (v) => v.estado === EstadosClientesEnum.ACTIVO,
    );
    const totalClientesBaja = clientes.filter(
      (v) => v.estado === EstadosClientesEnum.BAJA,
    );
    cliente['numeros'] = {
      total: clientes.length,
      totalActivos: totalClientesActivos.length,
      totalBajas: totalClientesBaja.length,
    };

    // Numeros de tareas activas
    const tareas = await this.getTareas();
    const totalTareasPendientes = tareas.filter(
      (v) => v.estado === Estados_Tareas.PENDIENTE,
    );
    const totalTareasFinalizadas = tareas.filter(
      (v) => v.estado === Estados_Tareas.FINALIZADA,
    );
    const totalTareasBajas = tareas.filter(
      (v) => v.estado === Estados_Tareas.BAJA,
    );
    tarea['numeros'] = {
      total: tareas.length,
      totalPendientes: totalTareasPendientes.length,
      totalFinalizadas: totalTareasFinalizadas.length,
      totalBajas: totalTareasBajas.length,
    };

    //porcentajes:

    // Proyectos activos vs finalizado vs baja
    proyecto['porcentajes'] = {
      activos:
        totalProyectosActivos.length > 0
          ? ((100 / proyectos.length) * totalProyectosActivos.length).toFixed(0)
          : '0',
      finalizados:
        totalProyectosfinalizados.length > 0
          ? (
              (100 / proyectos.length) *
              totalProyectosfinalizados.length
            ).toFixed(0)
          : '0',
      bajas:
        totalProyectosBajas.length > 0
          ? ((100 / proyectos.length) * totalProyectosBajas.length).toFixed(0)
          : '0',
    };

    //Clientes activos vs baja
    cliente['porcentajes'] = {
      activos:
        totalClientesActivos.length > 0
          ? ((100 / clientes.length) * totalClientesActivos.length).toFixed(0)
          : '0',
      bajas:
        totalClientesBaja.length > 0
          ? ((100 / clientes.length) * totalClientesBaja.length).toFixed(0)
          : '0',
    };

    // Tareas pendiente, finalizada, baja
    tarea['porcentajes'] = {
      pendientes:
        totalTareasPendientes.length > 0
          ? ((100 / tareas.length) * totalTareasPendientes.length).toFixed(0)
          : '0',
      finalizadas:
        totalTareasFinalizadas.length > 0
          ? ((100 / tareas.length) * totalTareasFinalizadas.length).toFixed(0)
          : '0',
      bajas:
        totalTareasBajas.length > 0
          ? ((100 / tareas.length) * totalTareasBajas.length).toFixed(0)
          : '0',
    };

    return {
      proyecto,
      cliente,
      tarea,
    };
  }
}
