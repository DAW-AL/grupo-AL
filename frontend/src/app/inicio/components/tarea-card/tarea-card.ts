import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarea-card',
  imports: [RouterLink],
  templateUrl: './tarea-card.html',
  styleUrl: './tarea-card.css',
})
export class TareaCard {

  estado = input<string>("");
  tarea = input<string>("");
  proyecto = input<string>("");
  cliente = input<string>("");
  proyectoId = input.required<number>();
  tareaId = input.required<number>();

  truncar(valor: string, limite = 30): string {
    return valor.length > limite ? valor.slice(0, limite) + '...' : valor;
  }
}
