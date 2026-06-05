import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
  id: number;
  descripcion: string;
  estado: EstadoTareas;
  proyecto?: {
    id: number;
    nombre: string;
    estado: string;
    idCliente: number
  };
}

enum EstadoTareas {
    PENDIENTE = 'PENDIENTE',
    FINALIZADA = 'FINALIZADA',
    BAJA = 'BAJA'
}

@Injectable({ providedIn: 'root' })
export class TareasApiClient {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1/proyectos';

  obtenerTarea(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.base}/tarea/${id}`);
  }

  crear(id: number, descripcion: string): Observable<{  }> {
    return this.http.post<{ id: number }>(
        `${this.base}/${id}/tarea`,
          { descripcion }
    );
  }
  
  modificar(
    id: number, 
    datos: { 
        descripcion?: string;
        estado?: string;
        }
    ): Observable<void> { 
    return this.http.patch<void>(
        `${this.base}/tareas/${id}`, 
        datos
        );
    }

//   eliminar(id: number): Observable<void> {  
//     return this.http.delete<void>(
//         `${this.base}/${id}`
//     );
//   }

//   finalizar(id: number): Observable<void> {
//     return this.http.put<void>(
//       `${this.base}/${id}`,
//       {
//         estado: 'FINALIZADO'
//       }
//     );
//   }

  reactivar(id: number): Observable<void> {
    return this.http.patch<void>(
      `${this.base}/tareas/${id}/reactivar`,
      {},
    );
  }

//   descargarReporte(): Observable<Blob> {
//     return this.http.get(
//       `${this.base}/reporte`,
//       {
//         responseType: 'blob',
//       },
//     );
//   }
}