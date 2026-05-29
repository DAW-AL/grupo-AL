import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Usuario {
  id: number;
  nombre: string;
  estado: string; 
  rol: string;    
}

@Injectable({ providedIn: 'root' })
export class UsuariosApiClient {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1/usuarios';

  obtenerTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.base);
  }

  crear(nombre: string, clave: string, rol: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.base, { nombre, clave, rol });
  }
  
  modificar(id: number, datos: { nombre?: string; clave?: string; rol?: string; estado?: string }): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.base}/${id}`, datos);
  }
}