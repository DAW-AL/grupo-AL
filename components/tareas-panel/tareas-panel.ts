import { Component, output, signal } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { ButtonAction } from "../buttons/button-action/button";
import { ButtonRegular } from "../buttons/button-regular/button-regular";

@Component({
  selector: 'app-tareas-panel',
  standalone: true,
  imports: [LowerCasePipe, ButtonAction, ButtonRegular],
  templateUrl: './tareas-panel.html',
  styleUrl: './tareas-panel.css',
})
export class TareasPanel {

  listatareas = [
    {
      "id": 1,
      "descripcion": "Tarea 1",
      "estado": "FINALIZADO"
    },
    {
      "id": 2,
      "descripcion": "Tarea 2",
      "estado": "FINALIZADO"
    },
    {
      "id": 3,
      "descripcion": "Tarea 3",
      "estado": "PENDIENTE"
    }
  ];

  tareas = signal(this.listatareas);
  editarTarea = output();

  showcase() {
    alert("Hiciste click en un boton: ");
  }

  editar() {
    this.editarTarea.emit();
  }

  checked(event: Event, item: any) {
    const input = event.target as HTMLInputElement;

    item.estado = input.checked
        ? 'FINALIZADO'
        : 'PENDIENTE';
  }

  analizarEstado() {
    alert()
  }
}
