import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../auth/auth-store';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css'
})
export class AppLayout {
  private readonly authStore = inject(AuthStore);

  get usuarioNombre(): string {
    return this.authStore.obtenerNombre();
  }

  get usuarioInicial(): string {
    return this.usuarioNombre.charAt(0).toUpperCase();
  }

  get esAdmin(): boolean {
    return this.authStore.obtenerRol() === 'admin';
  }

  cerrarSesion(): void {
    this.authStore.cerrarSesion();
  }
}