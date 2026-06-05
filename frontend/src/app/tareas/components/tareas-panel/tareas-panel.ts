import { Component, computed, inject, input, output, signal } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { ButtonRegular } from "../buttons/button-regular/button-regular";
import { TareasApiClient } from '../../tareas-api';

@Component({
  selector: 'app-tareas-panel',
  standalone: true,
  imports: [LowerCasePipe, ButtonRegular],
  templateUrl: './tareas-panel.html',
  styleUrl: './tareas-panel.css',
})
export class TareasPanel {

  tareas = input<any[]>([]);
  tareasFiltradas = computed(() =>
    this.tareas().filter((t: any) => t.estado !== 'BAJA')
  )
  tareasBaja = computed(() =>
    this.tareas().filter((t: any) => t.estado === 'BAJA')
  )
  editarTarea = output<any>();
  esAdmin = input(false);
  tareaReactivada = output();

  private readonly tareaApi = inject(TareasApiClient);

  showcase() {
    alert("Hiciste click en un boton: ");
  }

  editar(item: any) {
    this.editarTarea.emit(item);
  }

  checked(event: Event, item: any) {
    const input = event.target as HTMLInputElement;

    item.estado = input.checked
        ? 'FINALIZADA'
        : 'PENDIENTE';

    this.tareaApi.modificar(item.id, { estado: item.estado}).subscribe({
      next: (resultado) => {
        console.log(resultado)
      },
      error: (err) => {
        alert('Ocurrio un error y no se pudo cambiar el estado')
      }
    })
  
  }

  analizarEstado() {
    alert()
  }

  reactivar (id: number) {
    this.tareaApi.reactivar(id).subscribe({
      next: (resultado) => {
        this.tareaReactivada.emit();
      },
      error: (err) => {
        alert('Ocurrio un error y no se pudo reactivar la tarea')
      }
    })
  }
}