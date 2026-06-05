import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Header } from "./components/header/header";
import { StatCard } from './components/stat-card/stat-card';
import { Estadisticas, EstadisticasApi, Proyectos } from './inicio-api';
import { StatGraph } from "./components/stat-graph/stat-graph";
import { AuthStore } from '../auth/auth-store';
import { RouterLink } from '@angular/router';
import { TareaCard } from './components/tarea-card/tarea-card';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  imports: [Header, StatCard, StatGraph, RouterLink, TareaCard]
})
export class InicioComponent implements OnInit {

  estadisticas = signal<Estadisticas | null>(null);
  favCards = signal<{ title: string; value: number; description: string }[]>([]);
  allCards = signal<{ title: string; value: number; description: string }[]>([]);
  porcentajes = signal<{ titulo: string; detalles: string[]; datos: number[]}[]>([]);
  comentarios = signal<string[]>([]);
  tareas = signal<{proyectoId: number, proyecto: string, tareaId: number, tarea: string, cliente: string, estado: string}[]>([]); 
  proyectosIds = signal<number[]>([]);

  pendientes = computed(() => this.tareas().filter(t => t.estado === "PENDIENTE"));
  finalizadas = computed(() => this.tareas().filter(t => t.estado === "FINALIZADA"));
  bajas = computed(() => this.tareas().filter(t => t.estado === "BAJA"));


  todas = signal<boolean>(false);

  private readonly estadisticasApi = inject(EstadisticasApi);
  private readonly authStore = inject(AuthStore);

  esAdmin = signal(false);
  nombreUsuario = signal('');

  ngOnInit(): void {
    this.esAdmin.set(this.authStore.obtenerRol() === 'admin');
    this.nombreUsuario.set(this.authStore.obtenerNombre());
    if (this.esAdmin()) this.cargarEstadisticas();
    this.cargarProyectos();
  }

   cargarTareas(proyectos: { proyectoId: number, proyecto: string, cliente: string}[]): void {
      const resultadosTareas = proyectos.map( p => 
        this.estadisticasApi.obtenerTareas(p.proyectoId).pipe(
          map(tareas => tareas.map(t => ({
              proyectoId: p.proyectoId,
              proyecto: p.proyecto,
              tareaId: t.id,
              tarea: t.descripcion,
              cliente: p.cliente,
              estado: t.estado
          })))
        )
      );
      forkJoin(resultadosTareas).subscribe({
        next: (resultado) => {
          this.tareas.set(resultado.flat())
        },
        error: (err) => {
          console.error('Error al cargar tareas', err);
        }
      })
  }

  cargarProyectos(): void {
    this.estadisticasApi.obtenerProyectos().subscribe({
      next: (proys) => {
        const allProyectos = proys.map(p => ({ proyectoId: p.id, proyecto: p.nombre, cliente: p.cliente?.nombre ?? 'Interno'}));
        this.cargarTareas(allProyectos);
    }, error: (err) => {
      console.error('Error al cargar proyectos', err);
    }})
  }

  cargarEstadisticas(): void {
    this.estadisticasApi.obtenerEstadisticas().subscribe({
      next: (stats) => {
        this.estadisticas.set(stats);
        this.favCards.set ([
          { title: 'Proyectos', value: stats.proyecto.numeros.totalActivos, description: 'activos' },
          { title: 'Clientes',  value: stats.cliente.numeros.totalActivos,  description: 'activos' },
          { title: 'Tareas',    value: stats.tarea.numeros.totalPendientes,  description: 'pendientes'},
        ]);
        this.allCards.set([
          { title: 'Proyectos', value: stats.proyecto.numeros.total, description: 'total' },
          { title: 'Proyectos', value: stats.proyecto.numeros.totalFinalizados, description: 'finalizados' },
          { title: 'Proyectos', value: stats.proyecto.numeros.totalBajas, description: 'de baja' },
          { title: 'Clientes',  value: stats.cliente.numeros.total,  description: 'total' },
          { title: 'Clientes',  value: stats.cliente.numeros.totalBajas,  description: 'de baja' },
          { title: 'Tareas',    value: stats.tarea.numeros.total,  description: 'total' },
          { title: 'Tareas',    value: stats.tarea.numeros.totalFinalizadas,  description: 'finalizadas' },
          { title: 'Tareas',    value: stats.tarea.numeros.totalBajas,  description: 'de baja' },
        ]);
        this.porcentajes.set([
          { titulo: 'Proyectos', detalles: Object.keys(stats.proyecto.porcentajes), datos: Object.values(stats.proyecto.porcentajes).map(Number) },
          { titulo: 'Clientes', detalles: Object.keys(stats.cliente.porcentajes), datos: Object.values(stats.cliente.porcentajes).map(Number) },
          { titulo: 'Tareas', detalles: Object.keys(stats.tarea.porcentajes), datos: Object.values(stats.tarea.porcentajes).map(Number) },
        ]);
        this.cargarComentarios(stats);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  cargarComentarios(stats: Estadisticas): void {
      const comentarios: string[] = [];

    if (stats.cliente.numeros.totalBajas > stats.cliente.numeros.totalActivos) {
      comentarios.push(
        'El número de clientes en baja supera el número de clientes activos. ' +
        'Sugiero hacer una investigación interna para saber los motivos por los cuales ' +
        'los clientes fueron dados de baja, si hay insatisfacción de servicio u otro motivo.'
      );
    }

    if (stats.proyecto.numeros.totalBajas > stats.proyecto.numeros.total / 2) {
      comentarios.push(
        'Más de la mitad de los proyectos están dados de baja. ' +
        'Se recomienda revisar el estado general de los proyectos.'
      );
    }

    if (stats.tarea.numeros.totalPendientes > stats.tarea.numeros.totalFinalizadas) {
      comentarios.push(
        'Hay más tareas pendientes que finalizadas. ' +
        'Se recomienda priorizar la resolución de tareas activas.'
      );
    }

    if (stats.proyecto.numeros.totalActivos === 0) {
      comentarios.push(
        'No hay proyectos activos en este momento. ' +
        'Considere iniciar nuevos proyectos o reactivar alguno existente.'
      );
    }

    if (+stats.proyecto.porcentajes.finalizados >= 75) {
      comentarios.push(
        'El 75% o más de los proyectos están finalizados. ¡Excelente rendimiento del equipo!'
      );
    }

    if (stats.cliente.numeros.totalBajas === 0 && stats.cliente.numeros.total > 0) {
      comentarios.push(
        'Todos los clientes están activos. La retención de clientes es óptima.'
      );
    }

    if (stats.cliente.numeros.total === 0) {
      comentarios.push(
        'No hay clientes registrados. Se recomienda comenzar la captación de clientes.'
      );
    }

    if (stats.tarea.numeros.totalPendientes === 0 && stats.tarea.numeros.total > 0) {
      comentarios.push(
        'Todas las tareas están finalizadas. El equipo está al día con sus obligaciones.'
      );
    }

    if (stats.tarea.numeros.total === 0) {
      comentarios.push(
        'No hay tareas registradas. Considere asignar tareas a los proyectos activos.'
      );
    }

    if (+stats.tarea.porcentajes.bajas >= 50) {
      comentarios.push(
        'El 50% o más de las tareas fueron dadas de baja. ' +
        'Se recomienda revisar los criterios de cancelación de tareas.'
      );

    }

    if (comentarios.length === 0) {
      comentarios.push('Todo está en orden. No hay alertas por el momento.');
    }

    this.comentarios.set(comentarios);

  }
}