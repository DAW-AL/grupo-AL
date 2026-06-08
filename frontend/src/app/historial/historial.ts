import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { HistorialApiClient, HistorialCambio } from './historial-api-client';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    SelectModule,
  ],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class Historial implements OnInit {
  private readonly api = inject(HistorialApiClient);
  private readonly toast = inject(MessageService);

  todos = signal<HistorialCambio[]>([]);
  filtrados = signal<HistorialCambio[]>([]);
  loading = signal(false);
  filtroEntidad: string = '';

  sinResultados = computed(() => this.filtrados().length === 0);

  entidadOpciones = [
    { label: 'Todas', value: '' },
    { label: 'Proyectos', value: 'proyecto' },
    { label: 'Clientes', value: 'cliente' },
    { label: 'Tareas', value: 'tarea' },
    { label: 'Usuarios', value: 'usuario' },
  ];

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.loading.set(true);
    this.api.obtenerTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
        this.aplicarFiltro();
        this.loading.set(false);
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: 'Error al cargar historial' });
        this.loading.set(false);
      }
    });
  }

  aplicarFiltro(): void {
    const entidad = this.filtroEntidad;
    this.filtrados.set(
      entidad ? this.todos().filter(h => h.entidad === entidad) : [...this.todos()]
    );
  }

  onFiltroChange(valor: string): void {
    this.filtroEntidad = valor;
    this.aplicarFiltro();
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleString('es-AR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  accionClass(accion: string): string {
    const a = accion?.toLowerCase();
    if (a === 'crear') return 'accion-crear';
    if (a === 'modificar') return 'accion-modificar';
    if (a === 'eliminar') return 'accion-baja';
    if (a === 'reactivar') return 'accion-reactivar';
    return '';
  }
}