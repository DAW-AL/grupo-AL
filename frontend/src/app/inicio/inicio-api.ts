import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TareaProyecto {
  id: number;
  descripcion: string;
  estado: string;
}

export interface Proyectos {
  id: number;
  nombre: string;
  cliente?: ClienteProyecto;
}

interface ClienteProyecto {
  nombre: string
}

export interface Estadisticas {
  proyecto: Proyecto;
  cliente: Cliente;
  tarea: Tarea;
}

interface Proyecto {
  numeros: {
    total: number;
    totalActivos: number;
    totalFinalizados: number;
    totalBajas: number;
  };
  porcentajes: {
    activos: string;
    finalizados: string;
    bajas: string;
  };
}

interface Cliente {
  numeros: {
    total: number;
    totalActivos: number;
    totalBajas: number;
  };
  porcentajes: {
    activos: string;
    bajas: string;
  };
}

interface Tarea {
  numeros: {
    total: number;
    totalPendientes: number;
    totalFinalizadas: number;
    totalBajas: number;
  };
  porcentajes: {
    pendientes: string;
    finalizadas: string;
    bajas: string;
  };
}

@Injectable({ providedIn: 'root' })
export class EstadisticasApi {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1/estadisticas';
  private readonly proyectos = '/api/v1/proyectos';

  obtenerEstadisticas(): Observable<Estadisticas> {
    return this.http.get<Estadisticas>(`${this.base}`);
  }

  obtenerProyectos(): Observable<Proyectos[]> {
    return this.http.get<any>(`${this.proyectos}`);
  }

  obtenerTareas(proyectoId: number): Observable<TareaProyecto[]> {
    return this.http.get<any>(`${this.proyectos}/${proyectoId}/tarea`);
  }

}