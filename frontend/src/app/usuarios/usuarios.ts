import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { UsuariosApiClient, Usuario } from './usuarios-api-client';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    PasswordModule,
    SelectModule,
    InputTextModule,
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  private readonly api = inject(UsuariosApiClient);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(MessageService);

  usuarios = signal<Usuario[]>([]);
  loading = signal(false);
  drawerOpen = signal(false);
  guardando = signal(false);
  editando = signal<Usuario | null>(null);

  tituloDrawer = computed(() =>
    this.editando() ? 'Editar usuario' : 'Nuevo usuario'
  );

  rolesOpciones = [
    { label: 'Usuario', value: 'user' },
    { label: 'Administrador', value: 'admin' },
  ];

  estadoOpciones = [
    { label: 'Activo', value: 'ACTIVO' },
    { label: 'Baja', value: 'BAJA' },
  ];

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    clave: [''],
    rol: ['user', Validators.required],
    estado: ['ACTIVO']
  });

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.loading.set(true);
    this.api.obtenerTodos().subscribe({
      next: (data) => { this.usuarios.set(data); this.loading.set(false); },
      error: () => {
        this.toast.add({ severity: 'error', summary: 'Error al cargar usuarios' });
        this.loading.set(false);
      }
    });
  }

  abrirNuevo(): void {
    this.editando.set(null);
    this.form.reset({ nombre: '', clave: '', rol: 'user', estado: 'ACTIVO' });
    this.form.get('clave')?.setValidators(Validators.required);
    this.form.get('clave')?.updateValueAndValidity();
    this.drawerOpen.set(true);
  }

abrirEditar(u: Usuario): void {
    this.editando.set(u);
    this.form.reset({ nombre: u.nombre, clave: '', rol: u.rol, estado: u.estado });
    this.form.get('clave')?.clearValidators();
    this.form.get('clave')?.updateValueAndValidity();

    // Si el usuario está en baja, desactivamos nombre, clave y rol
    if (!this.isActivo(u)) {
      this.form.get('nombre')?.disable();
      this.form.get('clave')?.disable();
      this.form.get('rol')?.disable();
    } else {
      this.form.get('nombre')?.enable();
      this.form.get('clave')?.enable();
      this.form.get('rol')?.enable();
    }

    this.drawerOpen.set(true);
  }

  cerrarDrawer(): void {
    this.drawerOpen.set(false);
    this.editando.set(null);
    this.form.reset();
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    const { nombre, clave, rol, estado } = this.form.value;

    const obs = this.editando()
      ? this.api.modificar(this.editando()!.id, {
          nombre,
          rol,
          estado,
          ...(clave ? { clave } : {})
        })
      : this.api.crear(nombre, clave, rol);

    obs.subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: this.editando() ? 'Usuario actualizado' : 'Usuario creado'
        });
        this.guardando.set(false);
        this.cerrarDrawer();
        this.cargar();
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Error al guardar',
          detail: Array.isArray(err.error?.message)
            ? err.error.message.join(', ')
            : err.error?.message
        });
        this.guardando.set(false);
      }
    });
  }

  isActivo(u: Usuario): boolean {
    return u.estado?.toUpperCase() === 'ACTIVO';
  }

  tieneError(field: string, error: string): boolean {
    const c = this.form.get(field);
    return !!(c?.touched && c?.hasError(error));
  }
}