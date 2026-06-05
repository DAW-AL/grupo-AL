import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosApiClient } from '../proyectos/proyectos-api-client';
import { DetallesBar } from './components/detalles-bar/detalles-bar';
import { TareasPanel } from './components/tareas-panel/tareas-panel';
import { AuthStore } from '../auth/auth-store';
import { Tarea, TareasApiClient } from './tareas-api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { ButtonRegular } from "./components/buttons/button-regular/button-regular";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-tareas',
  imports: [DetallesBar, TareasPanel, ButtonModule, ReactiveFormsModule, InputTextModule, FluidModule, SelectModule, ButtonRegular, ToastModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class TareasComponent implements OnInit {

  private readonly proyectosApi = inject(ProyectosApiClient);
  private readonly tareasApi = inject(TareasApiClient);
  private readonly fb = inject(FormBuilder);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly toast = inject(MessageService);

  id: string = "";
  proyecto = signal<any>({});
  esAdmin = signal<boolean>(false);
  drawerOpen = signal(false);
  editando = signal<Tarea | null>(null);
  tituloDrawer = computed(() =>
    this.editando()
      ? 'Editar tarea'
      : 'Nueva tarea'
  );

  form: FormGroup = this.fb.group({
    descripcion: ['', [Validators.required, Validators.minLength(2)]],
    estado: ['']
  });

  estados = computed(() => 
    this.esAdmin()
      ? [
          { label: 'Pendiente', value: 'PENDIENTE' },
          { label: 'Finalizada', value: 'FINALIZADA' },
          { label: 'Baja', value: 'BAJA' },
        ]
      : [
          { label: 'Pendiente', value: 'PENDIENTE' },
          { label: 'Finalizada', value: 'FINALIZADA' },
        ]
  );

  guardando = signal(false);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.esAdmin.set(this.authStore.obtenerRol() === 'admin');
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.traerTareas(this.id);
  }

  traerTareas (id: string) {
    this.proyectosApi.obtenerProyecto(+id).subscribe({
      next: (proyectoInfo) => {
        this.proyecto.set(proyectoInfo);
        console.log(this.proyecto())
      },
      error: (err) => {

      }
    });
  }

  guardar(): void {

    const {descripcion, estado} = this.form.value;

    if (this.editando()) {
      this.tareasApi.modificar(this.editando()!.id, { descripcion, estado }).subscribe({
        next: () => {
          this.toast.add({ severity: 'success', summary: 'Tarea actualizada' });
          this.cerrarDrawer();
          this.traerTareas(this.id);
        },
        error: (err) => {
          this.toast.add({ severity: 'error', summary: err.error?.message || 'Error al guardar' });
        }
      });
    } else {
      this.tareasApi.crear(+this.id, descripcion).subscribe({
        next: () => {
          this.toast.add({ severity: 'success', summary: 'Tarea creada' });
          this.cerrarDrawer();
          this.traerTareas(this.id);
        },
        error: (err) => {
          this.toast.add({ severity: 'error', summary: err.error?.message || 'Error al guardar' });
        }
      })
    }
  }

   abrirNuevo(): void {
    this.editando.set(null);

    this.form.reset({
      descripcion: ''
    });

    this.drawerOpen.set(true);
  }

  abrirEditar(item: any): void {
  
      this.editando.set(item);

      this.form.reset({
        descripcion: item.descripcion,
        estado: item.estado
      });

      this.drawerOpen.set(true);
  }

  cerrarDrawer(): void {
    this.drawerOpen.set(false);
    this.editando.set(null);
    this.form.reset();
  }

  tieneError(field: string, error: string): boolean {
    const control = this.form.get(field);

    return !!(
      control?.touched &&
      control?.hasError(error)
    );
  }

  volver () {
    this.router.navigate(['/proyectos']);
  }
  
}
