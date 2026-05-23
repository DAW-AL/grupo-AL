import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { ButtonRegular } from "../buttons/button-regular/button-regular";

const estadoTareas = [
    "pendiente",
    "finalizada",
    "baja"
]

@Component({
  selector: 'app-editar-panel',
  imports: [FormsModule, TitleCasePipe, ButtonRegular],
  templateUrl: './editar-panel.html',
  styleUrl: './editar-panel.css',
})
export class EditarPanel {

  tituloEditar = input("");
  estadoValues = estadoTareas;
  descripcion: string = "";
  estado: string = "";

  panelCerrado: boolean = true;

  guardar() {
    if (this.descripcion !== "" && this.estado !== "") {
      alert(` Se guardo ${this.descripcion} con estado ${this.estado}`);
      this.descripcion = "";
      this.estado = "";
    } else {
      alert("No seleccionaste nada. Ambos campos son obligatorios")
    }
  }

  cerrar() {
    this.panelCerrado = true;
    this.descripcion = "";
    this.estado = "";
  }

  abrir() {
    this.panelCerrado = false;
  }
}
