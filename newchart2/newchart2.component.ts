import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexYAxis,
} from 'ng-apexcharts';

export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxias: ApexXAxis;
  yaxias: ApexYAxis | ApexYAxis[];
  datalabel: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  markers: string; //ApexMarkers;
  stroke: number[]; //ApexStroke;
};

@Component({
  selector: 'app-newchart2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './newchart2.component.html',
  styleUrl: './newchart2.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Newchart2Component {
  @ViewChild('chart') chartdiv!: chartOptions;

  public chartOptions = {
    series: [
      {
        name: 'Income',
        type: 'column',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: 'Cashflow',
        type: 'area',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 4],
    },
    title: {
      text: 'XYZ - Stock Analysis (2009 - 2025)',
      align: 'left',
      offsetX: 110,
    },
    xaxis: {
      categories: [2009, 2010, 2015, 2016, 2019, 2020, 2024, 2025],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB',
        },
        labels: {
          style: {
            color: '#008FFB',
          },
        },
        title: {
          text: 'Income (thousand crores)',
          style: {
            color: '#008FFB',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: 'Income',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396',
        },
        labels: {
          style: {
            color: '#00E396',
          },
        },
        title: {
          text: 'Operating Cashflow (thousand crores)',
          style: {
            color: '#00E396',
          },
        },
      },
      {
        seriesName: 'Revenue',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FEB019',
        },
        labels: {
          style: {
            color: '#FEB019',
          },
        },
        title: {
          text: 'Revenue (thousand crores)',
          style: {
            color: '#FEB019',
          },
        },
      },
    ],

    tooltip: {
      fixed: {
        enabled: true,
        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60,
      },
    },

    legend: {
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  ngAfterViewInit(): void {
    const chart = new ApexCharts(
      document.querySelector('#chart'),
      this.chartOptions
    );
    chart.render();
  }
}
