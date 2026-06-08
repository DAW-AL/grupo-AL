import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface HistorialCambio {
  id: number;
  entidad: string;       
  entidadId: number;    
  accion: string;       
  descripcion: string;   
  usuarioNombre: string; 
  fechaCambio: string;   
}

@Injectable({ providedIn: 'root' })
export class HistorialApiClient {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1/historial';

  obtenerTodos(): Observable<HistorialCambio[]> {
    return this.http.get<HistorialCambio[]>(this.base);
  }

}