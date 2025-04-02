import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private service1 = inject(MasterService);
  myclass: string = '';
  result: string = '';

  public chartOptions!: {}; // Declare chartOptions variable

  constructor() {
    this.service1.onRolechange$.subscribe((res: string) => {
      this.result = res;
    });
    this.service1.onCLassChange.subscribe((res: string) => {
      this.myclass = res;
    });
  }

  ngOnInit(): void {
    // Chart data initialization
    this.initialchart();
  }

  ngAfterViewInit(): void {
    // Ensure chart is rendered after the view is initialized
    const chart = new ApexCharts(
      document.querySelector('#chart'),
      this.chartOptions
    );
    chart.render();
  }

  private initialchart(): void {
    this.chartOptions = {
      series: [
        {
          name: 'South',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017 GMT').getTime(),
            20,
            {
              min: 10,
              max: 60,
            }
          ),
        },
        {
          name: 'North',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017 GMT').getTime(),
            20,
            {
              min: 10,
              max: 20,
            }
          ),
        },
        {
          name: 'Central',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2017 GMT').getTime(),
            20,
            {
              min: 10,
              max: 15,
            }
          ),
        },
      ],
      chart: {
        type: 'line',
        height: 400,
        stacked: true,
        events: {
          selection: function (chart: ApexCharts, e?: ApexCharts) {},
        },
      },
      colors: ['#008FFB', '#00E396', '#CED4DC'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.4,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
    };
  }

  public generateDayWiseTimeSeries(
    baseval: number,
    count: number,
    yrange: { min: number; max: number }
  ) {
    let i = 0;
    const series = [];
    while (i < count) {
      const x = baseval;
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
