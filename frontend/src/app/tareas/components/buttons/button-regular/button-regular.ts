import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-regular',
  imports: [],
  templateUrl: './button-regular.html',
  styleUrl: './button-regular.css',
})
export class ButtonRegular {

  boton = input("");
  icono = input("")
  clicked = output();
  
}