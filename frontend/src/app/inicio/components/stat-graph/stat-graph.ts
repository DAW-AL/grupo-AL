import { Component, ElementRef, AfterViewInit, ViewChild, input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-stat-graph',
  standalone: true,
  imports: [],
  templateUrl: './stat-graph.html',
  styleUrl: './stat-graph.css',
})
export class StatGraph implements AfterViewInit {

  @ViewChild('miCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  titulo = input<string>('');
  detalles = input<string[]>([]);
  datos = input<number[]>([]);
  colores = input<string[]>(['#1e88e5', '#43a047', '#e53935']);

  ngAfterViewInit(): void {
    new Chart(this.canvasRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.detalles(),
        datasets: [{ 
          data: this.datos(),
          backgroundColor: this.colores(),
          borderWidth: 0,
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: this.titulo(), 
            font: { size: 12 },
            color: '#7c6fcd',
          },
          legend: {
            position: 'right',
          },
          datalabels: {
            color: 'white',
            font: { size: 14, weight: 'bold' },
            formatter: (value) => value + '%',
          }
        }
      }
    });
  }
}