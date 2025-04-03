import {
  Component,
  OnInit,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import ApexCharts from "apexcharts";
import { CommonModule } from "@angular/common";

interface SelectedData {
  series: string; // ✅ This should be a string, not ApexAxisChartSeries
  x: string;
  y: number;
}

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}

  public chartOptions!: Partial<ApexCharts.ApexOptions>;
  selectedData: SelectedData | null = null;
  showPopup = false;
  popupStyle = { left: "0px", top: "0px" };
  private chart!: ApexCharts;

  ngOnInit(): void {
    this.initializeChart();
  }

  ngAfterViewInit(): void {
    const chartElement = document.querySelector("#chart");
    if (chartElement) {
      this.chart = new ApexCharts(chartElement, this.chartOptions);
      this.chart.render();
    }
  }

  private initializeChart(): void {
    this.chartOptions = {
      series: [
        {
          name: "South",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017 GMT").getTime(),
            20,
            { min: 10, max: 60 }
          ),
        },
        {
          name: "North",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017 GMT").getTime(),
            20,
            { min: 10, max: 20 }
          ),
        },
        {
          name: "Central",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017 GMT").getTime(),
            20,
            { min: 10, max: 15 }
          ),
        },
      ] as ApexAxisChartSeries,
      chart: {
        type: "bar",
        height: 400,
        stacked: true,
        events: {
          dataPointSelection: (
            event: MouseEvent,
            chartContext: ApexCharts,
            config: {
              seriesIndex: number;
              dataPointIndex: number;
              selectedDataPoints: number[][];
            }
          ) => {
            this.onDataPointClick(event, chartContext, config);
          },
        },
        animations: { enabled: false },
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      colors: ["#008FFB", "#00E396", "#CED4DC"],
      dataLabels: { enabled: false },
      fill: {
        type: "gradient",
        gradient: { opacityFrom: 0.4, opacityTo: 0.8 },
      },
      legend: { position: "top", horizontalAlign: "left" },
      xaxis: { type: "datetime" },
    };
  }

  private generateDayWiseTimeSeries(
    baseval: number,
    count: number,
    yrange: { min: number; max: number }
  ): [number, number][] {
    const series: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      const x = baseval;
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      series.push([x, y]);
      baseval += 86400000;
    }
    return series;
  }

  private onDataPointClick(
    event: MouseEvent | TouchEvent,
    chartContext: ApexCharts,
    config: { seriesIndex: number; dataPointIndex: number }
  ): void {
    const seriesItem = this.chartOptions.series?.[config.seriesIndex];

    if (
      seriesItem &&
      typeof seriesItem === "object" &&
      "name" in seriesItem &&
      Array.isArray(seriesItem.data)
    ) {
      const seriesName = seriesItem.name as string;
      const dataPoint = seriesItem.data[config.dataPointIndex] as [
        number,
        number
      ];

      if (dataPoint) {
        this.selectedData = {
          series: seriesName,
          x: new Date(dataPoint[0]).toDateString(),
          y: dataPoint[1],
        };
      }
    }

    // ✅ Handle both MouseEvent & TouchEvent
    let clientX = 0;
    let clientY = 0;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    this.showPopup = true;
    this.popupStyle = {
      left: `${clientX + 10}px`,
      top: `${clientY + 10}px`,
    };

    console.log(this.selectedData);
    this.cdr.detectChanges();
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
