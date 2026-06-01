import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  mostrarTodas = output<void>();
  labelBoton = input<string>('Todas estadísticas');
  mostrarBoton = input<boolean>(true);

}
