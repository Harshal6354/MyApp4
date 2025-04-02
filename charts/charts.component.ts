import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexOptions,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-charts',
  standalone: true,
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChartsComponent implements OnInit {
  ngOnInit(): void {}
  chartOptions = {
    series: [
      {
        name: 'Sample Data',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      type: 'line',
      height: 350,
    },
    title: {
      text: 'Basic Line Chart',
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
  };
}
