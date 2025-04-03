import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MasterService } from "../../services/master.service";
import ApexCharts from "apexcharts";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // private service1 = inject(MasterService);
  // myclass: string = "";
  // result: string = "";
  constructor(private cdr: ChangeDetectorRef) {}
  public chartOptions!: {};
  selectedData: any = null;
  showPopup = false;
  popupStyle = { left: "0px", top: "0px" };

  // constructor() {
  //   this.service1.onRolechange$.subscribe((res: string) => {
  //     this.result = res;
  //   });
  //   this.service1.onCLassChange.subscribe((res: string) => {
  //     this.myclass = res;
  //   });
  // }

  ngOnInit(): void {
    this.initialchart();
  }

  ngAfterViewInit(): void {
    const chart = new ApexCharts(
      document.querySelector("#chart"),
      this.chartOptions
    );
    chart.render();
  }

  private initialchart(): void {
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
      ],
      chart: {
        type: "bar",
        height: 400,
        stacked: true,
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            this.onDataPointClick(event, config);
          },
        },

        animations: {
          enabled: false, // Disable animations if causing issues
        },
        zoom: {
          enabled: false, // Disable zooming if not needed
        },
        toolbar: {
          show: false, // Disable toolbar interactions
        },
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

  onDataPointClick(event: MouseEvent, config: any) {
    this.selectedData = {
      series: config.w.config.series[config.seriesIndex].name,
      x: new Date(
        config.w.config.series[config.seriesIndex].data[
          config.dataPointIndex
        ][0]
      ).toDateString(),
      y: config.w.config.series[config.seriesIndex].data[
        config.dataPointIndex
      ][1],
    };

    this.showPopup = true;
    this.popupStyle = {
      left: `${event.clientX + 10}px`,
      top: `${event.clientY + 10}px`,
    };
    console.log(this.selectedData);
    this.cdr.detectChanges(); // 🔥 This forces Angular to update the UI
  }

  closePopup() {
    this.showPopup = false;
  }
}
