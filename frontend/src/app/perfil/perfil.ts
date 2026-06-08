import { Component, OnInit, signal } from '@angular/core';
import { inject } from '@angular/core';
import { AuthStore } from '../auth/auth-store';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, TagModule, ButtonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  nombreUsuario = signal('');
  rolUsuario = signal('');
  inicial = signal('');
  esAdmin = signal(false);
  fotoUrl = signal<string | null>(null);

  ngOnInit(): void {
    const nombre = this.authStore.obtenerNombre();
    const rol = this.authStore.obtenerRol();
    this.nombreUsuario.set(nombre);
    this.rolUsuario.set(rol);
    this.inicial.set(nombre.charAt(0).toUpperCase());
    this.esAdmin.set(rol === 'admin');

    // recuperar foto si existe en sessionStorage
    const fotoGuardada = sessionStorage.getItem('fotoPerfilUrl');
    if (fotoGuardada) this.fotoUrl.set(fotoGuardada);
  }

  volver(): void {
    this.location.back();
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('fotoPerfilUrl');
    this.authStore.cerrarSesion();
  }

  irAUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }

  cambiarFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const archivo = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const resultado = reader.result as string;
      this.fotoUrl.set(resultado);
      sessionStorage.setItem('fotoPerfilUrl', resultado);
    };
    reader.readAsDataURL(archivo);
  }

  abrirSelectorFoto(): void {
    document.getElementById('inputFoto')?.click();
  }
}