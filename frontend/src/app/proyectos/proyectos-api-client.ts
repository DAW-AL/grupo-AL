import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Proyecto {
  id: number;
  nombre: string;
  estado: string;
  cliente?: {
    id: number;
    nombre: string;
    estado: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ProyectosApiClient {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1/proyectos';

  obtenerTodos(estado?: string): Observable<Proyecto[]> {
    let params = new HttpParams();
    if (estado) {
      params = params.set('estado', estado);
    }
    return this.http.get<Proyecto[]>(this.base, { params });
  }

  obtenerProyecto(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.base}/${id}`);
  }

  crear(nombre: string, idCliente: number): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(
        this.base, 
        { 
            nombre,
            idCliente 
        }
    );
  }
  
  modificar(
    id: number, 
    datos: { 
        nombre: string;
        idCliente: number;
        estado?: string;
        }
    ): Observable<void> { 
    return this.http.put<void>(
        `${this.base}/${id}`, 
        datos
        );
    }

  eliminar(id: number): Observable<void> {  
    return this.http.delete<void>(
        `${this.base}/${id}`
    );
  }

  finalizar(id: number): Observable<void> {
    return this.http.put<void>(
      `${this.base}/${id}`,
      {
        estado: 'FINALIZADO'
      }
    );
  }

  reactivar(id: number): Observable<void> {
    return this.http.patch<void>(
      `${this.base}/${id}/reactivar`,
      {},
    );
  }

  descargarReporte(): Observable<Blob> {
    return this.http.get(
      `${this.base}/reporte`,
      {
        responseType: 'blob',
      },
    );
  }
}

