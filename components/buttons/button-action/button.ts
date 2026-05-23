import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-action',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonAction {

  boton = input("");
  icono = input("");
  clicked = output();

}
