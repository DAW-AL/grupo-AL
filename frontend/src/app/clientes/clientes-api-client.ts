import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class ClientesApiClient {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1/clientes';

  obtenerTodos(estado?: string): Observable<Cliente[]> {
    let params = new HttpParams();
    if (estado) {
      params = params.set('estado', estado);
    }
    return this.http.get<Cliente[]>(this.base, { params });
  }

  obtenerCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.base}/${id}`);
  }

  crear(nombre: string, telefono: string, email: string): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.base, { nombre, telefono, email });
  }
  
  modificar(id: number, datos: { nombre: string; telefono: string; email: string }): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.base}/${id}`, datos);
  }

  eliminar(id: number): Observable<{ id: number; nombre: string; estado: string }> {
    return this.http.delete<{ id: number; nombre: string; estado: string }>(`${this.base}/${id}`);
  }

  reactivar(id: number): Observable<{ id: number; nombre: string; estado: string }> {
    return this.http.patch<{ id: number; nombre: string; estado: string }>(`${this.base}/${id}/reactivar`, {});
  }
}