import { Component, input, output } from '@angular/core';
import { ButtonAction } from '../buttons/button-action/button-action';


@Component({
  selector: 'app-detalles-bar',
  standalone: true,
  imports: [ButtonAction],
  templateUrl: './detalles-bar.html',
  styleUrl: './detalles-bar.css',
})
export class DetallesBar {

  titulo = input("");
  abrirNuevo = output();
  
  showcase() {
    alert("Seleccionaste el boton")
  }
}