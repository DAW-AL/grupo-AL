import { Component, input } from '@angular/core';
import { ButtonAction } from "../buttons/button-action/button";

@Component({
  selector: 'app-detalles-bar',
  standalone: true,
  imports: [ButtonAction],
  templateUrl: './detalles-bar.html',
  styleUrl: './detalles-bar.css',
})
export class DetallesBar {

  titulo = input("");
  
  showcase() {
    alert("Seleccionaste el boton")
  }
}
