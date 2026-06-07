import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../auth/auth-store';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css'
})
export class AppLayout {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  sidebarExpandido = signal(true);
  fotoUrl = signal<string | null>(null); // NUEVO

  constructor() {
    // navegás a cualquier ruta, relee la foto del sessionStorage
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.fotoUrl.set(sessionStorage.getItem('fotoPerfilUrl'));
    });
  }

  get usuarioNombre(): string { return this.authStore.obtenerNombre(); }
  get usuarioInicial(): string { return this.usuarioNombre.charAt(0).toUpperCase(); }
  get esAdmin(): boolean { return this.authStore.obtenerRol() === 'admin'; }

  toggleSidebar(): void { this.sidebarExpandido.update(v => !v); }
  cerrarSesion(): void { this.authStore.cerrarSesion(); }
}

