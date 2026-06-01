import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  obtenerEstadisticas(): Observable<Estadisticas> {
    return this.http.get<Estadisticas>(`${this.base}`);
  }

}