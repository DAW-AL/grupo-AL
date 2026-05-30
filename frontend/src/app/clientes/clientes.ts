import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  standalone: true,
  template: `
    <div style="padding: 32px; font-family: 'Montserrat', sans-serif; color: #4e4e60;">
      <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 8px;">Clientes</h2>
      <p style="color: #8e8e9e; font-size: 14px;">Zequi</p>
    </div>
  `
})
export class ClientesComponent {}