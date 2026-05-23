import { Component, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-graphs',
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './graphs.html',
  styleUrl: './graphs.css',
})
export class Graphs {

  labels = input<string[]>([]);
  values = input<number[]>([]);
  titulo = input<string>("");

  get pieChartData(): ChartData<'pie'> {
    return {
      labels: this.labels(),
      datasets: [{ data: this.values() }]
    };
  }

  pieChartType: ChartType = 'pie';
}
