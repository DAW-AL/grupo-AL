import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AuthStore } from '../auth/auth-store';

import {
  ProyectosApiClient,
  Proyecto
} from './proyectos-api-client';

import {
  ClientesApiClient,
  Cliente
} from '../clientes/clientes-api-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-proyectos',
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
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css',
  providers: [ConfirmationService]
})
export class ProyectosComponent implements OnInit {

  private readonly api = inject(ProyectosApiClient);
  private readonly clientesApi = inject(ClientesApiClient);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly authStore = inject(AuthStore);

  proyectos = signal<Proyecto[]>([]);
  clientes = signal<Cliente[]>([]);

  loading = signal(false);
  drawerOpen = signal(false);
  guardando = signal(false);

  editando = signal<Proyecto | null>(null);

  filtroEstado = signal('');

  esAdmin = signal(false);

  tituloDrawer = computed(() =>
    this.editando()
      ? 'Editar proyecto'
      : 'Nuevo proyecto'
  );

  filtroOpciones = [
    { label: 'Todos', value: '' },
    { label: 'Activos', value: 'ACTIVO' },
    { label: 'Finalizados', value: 'FINALIZADO' },
    { label: 'Bajas', value: 'BAJA' }
  ];

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    idCliente: [null]
  });

  ngOnInit(): void {
    this.esAdmin.set(this.authStore.obtenerRol() === 'admin');

    this.cargar();
    this.cargarClientes();
  }

  cargar(): void {
    this.loading.set(true);

    this.api.obtenerTodos(this.filtroEstado()).subscribe({
      next: (data) => {
        this.proyectos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.add({
          severity: 'error',
          summary: 'Error al cargar proyectos'
        });

        this.loading.set(false);
      }
    });
  }

  cargarClientes(): void {
    this.clientesApi.obtenerTodos('ACTIVO').subscribe({
      next: (data) => {
        this.clientes.set(data);
      },
      error: () => {
        this.toast.add({
          severity: 'error',
          summary: 'Error al cargar clientes'
        });
      }
    });
  }

  abrirNuevo(): void {
    this.editando.set(null);

    this.form.reset({
      nombre: '',
      idCliente: null
    });

    this.drawerOpen.set(true);
  }

  abrirEditar(p: Proyecto): void {

    this.editando.set(p);

    this.form.reset({
      nombre: p.nombre,
      idCliente: p.cliente?.id ?? null
    });

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

    const {
      nombre,
      idCliente
    } = this.form.value;

    const obs: Observable<void | { id: number }> = this.editando()
      ? this.api.modificar(
          this.editando()!.id,
          {
            nombre,
            idCliente
          }
        )
      : this.api.crear(
          nombre,
          idCliente
        );

    obs.subscribe({
      next: () => {

        this.toast.add({
          severity: 'success',
          summary: this.editando()
            ? 'Proyecto actualizado'
            : 'Proyecto creado'
        });

        this.guardando.set(false);

        this.cerrarDrawer();

        this.cargar();
      },

      error: (err: HttpErrorResponse) => {

        this.toast.add({
          severity: 'error',
          summary:
            err.error?.message ||
            'Error al guardar'
        });

        this.guardando.set(false);
      }
    });
  }

  finalizar(p: Proyecto): void {

    this.confirmationService.confirm({

      message:
        `¿Desea finalizar el proyecto ${p.nombre}?`,

      header: 'Confirmar finalización',

      icon: 'pi pi-exclamation-triangle',

      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },

      acceptButtonProps: {
        label: 'Finalizar',
        severity: 'success'
      },

      accept: () => {

        this.api.finalizar(p.id).subscribe({

          next: () => {

            this.toast.add({
              severity: 'success',
              summary: 'Proyecto finalizado'
            });

            this.cargar();
          },

          error: (err: HttpErrorResponse) => {

            this.toast.add({
              severity: 'error',
              summary:
                err.error?.message ||
                'No se pudo finalizar el proyecto'
            });
          }
        });
      }
    });
  }

  darDeBaja(p: Proyecto): void {

    this.confirmationService.confirm({

      message:
        `¿Desea dar de baja el proyecto ${p.nombre}?`,

      header: 'Confirmar baja',

      icon: 'pi pi-exclamation-triangle',

      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },

      acceptButtonProps: {
        label: 'Dar de baja',
        severity: 'danger'
      },

      accept: () => {

        this.api.eliminar(p.id).subscribe({

          next: () => {

            this.toast.add({
              severity: 'success',
              summary: 'Proyecto dado de baja'
            });

            this.cargar();
          },

          error: (err) => {

            this.toast.add({
              severity: 'error',
              summary:
                err.error?.message ||
                'No se pudo dar de baja'
            });
          }
        });
      }
    });
  }

  reactivar(p: Proyecto): void {

    this.confirmationService.confirm ({

      message:
        `¿Desea reactivar el proyecto ${p.nombre}?`,

      header: 'Confirmar alta',

      icon: 'pi pi-exclamation-triangle',

      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },

      acceptButtonProps: {
        label: 'Dar de alta',
        severity: 'success'
      },

      accept: () => {
        this.api.reactivar(p.id).subscribe({

          next: () => {

            this.toast.add({
              severity: 'success',
              summary: 'Proyecto reactivado'
            });

            this.cargar();
          },

          error: (err: HttpErrorResponse) => {

            this.toast.add({
              severity: 'error',
              summary: 
                err.error?.message ||
                'No se pudo activar el proyecto'
            });
          }
        })
      }

    })
  }

  isActivo(p: Proyecto): boolean {
    return p.estado === 'ACTIVO';
  }

  isFinalizado(p: Proyecto): boolean {
    return p.estado === 'FINALIZADO';
  }

  isBaja(p: Proyecto): boolean {
    return p.estado === 'BAJA';
  }

  tieneError(field: string, error: string): boolean {
    const control = this.form.get(field);

    return !!(
      control?.touched &&
      control?.hasError(error)
    );
  }

  descargarPdf(): void {

    this.api
      .descargarReporte()
      .subscribe({
        next: (blob) => {

          const url =
            window.URL.createObjectURL(blob);

          const link =
            document.createElement('a');

          link.href = url;
          link.download =
            'Reporte-Proyectos.pdf';

          link.click();

          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}