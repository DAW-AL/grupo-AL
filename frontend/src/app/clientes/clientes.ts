import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthStore } from '../auth/auth-store';
import { ClientesApiClient, Cliente } from './clientes-api-client';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ConfirmDialogModule
  ],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
  providers: [ConfirmationService]
})
export class ClientesComponent implements OnInit {
  private readonly api = inject(ClientesApiClient);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly authStore = inject(AuthStore);

  clientes = signal<any[]>([]); 
  loading = signal(false);
  drawerOpen = signal(false);
  guardando = signal(false);
  editando = signal<Cliente | null>(null);
  filtroEstado = signal<string>(''); 

  tituloDrawer = computed(() => (this.editando() ? 'Editar cliente' : 'Nuevo cliente'));
  esAdmin = signal(false);

  filtroOpciones = [
    { label: 'Todos', value: '' },
    { label: 'Activos', value: 'ACTIVO' },
    { label: 'Bajas', value: 'BAJA' },
  ];

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    telefono: ['', [Validators.pattern(/^\+54[0-9]{10,11}$/)]], 
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    this.esAdmin.set(this.authStore.obtenerRol() === 'admin');
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.api.obtenerTodos(this.filtroEstado()).subscribe({
      next: (data) => {
        this.clientes.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: 'Error al cargar clientes' });
        this.loading.set(false);
      },
    });
  }

  abrirNuevo(): void {
    this.editando.set(null);
    this.form.reset({ nombre: '', telefono: '', email: '' });
    this.drawerOpen.set(true);
  }

  abrirEditar(c: Cliente): void {
    this.editando.set(c);
    this.form.reset({ nombre: c.nombre, telefono: c.telefono, email: c.email });
    this.drawerOpen.set(true);
  }

  cerrarDrawer(): void {
    this.drawerOpen.set(false);
    this.editando.set(null);
    this.form.reset();
  }

  guardar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.guardando.set(true);
    const { nombre, telefono, email } = this.form.value;

    const obs = this.editando()
      ? this.api.modificar(this.editando()!.id, { nombre, telefono, email })
      : this.api.crear(nombre, telefono, email);

    obs.subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: this.editando() ? 'Cliente actualizado' : 'Cliente creado',
        });
        this.guardando.set(false);
        this.cerrarDrawer();
        this.cargar();
      },
      error: (err) => {
        this.toast.add({ severity: 'error', summary: err.error?.message || 'Error al guardar' });
        this.guardando.set(false);
      },
    });
  }

  darDeBaja(c: Cliente): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas dar de baja al cliente ${c.nombre}?`,
      header: 'Confirmar Baja',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Dar de Baja', severity: 'danger' },
      accept: () => {
        this.api.eliminar(c.id).subscribe({
          next: () => {
            this.toast.add({ severity: 'success', summary: `El cliente ${c.nombre} dado de baja` });
            this.cargar();
          },
          error: (err) => {
            this.toast.add({
              severity: 'error',
              summary: 'No se pudo dar de baja',
              detail: err.error?.message,
            });
          },
        });
      }
    });
  }

  reactivar(c:Cliente): void {
    this.api.reactivar(c.id).subscribe({
      next: () => {
        this.toast.add({ severity: 'success', summary: `El cliente ${c.nombre} esta reactivado` });
        this.cargar();
      },
      error: (err) => {
        this.toast.add({ severity: 'error', summary: err.error?.message || 'Error al reactivar' });
      },
    });
  }

  isActivo(c: Cliente): boolean {
    return c.estado?.toUpperCase() === 'ACTIVO';
  }

  tieneError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!(control?.touched && control?.hasError(error));
  }
}