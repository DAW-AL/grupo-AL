import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-action',
  imports: [],
  templateUrl: './button-action.html',
  styleUrl: './button-action.css',
})
export class ButtonAction {

  boton = input("");
  icono = input("");
  clicked = output();

}