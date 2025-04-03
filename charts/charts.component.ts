import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import ApexCharts from "apexcharts";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements AfterViewInit {
  @ViewChild("chart", { static: false }) chartdiv!: ElementRef; // ✅ Fix: Ensure ViewChild targets the correct element
  constructor(private cdr: ChangeDetectorRef) {}
  public chartOptions = {
    series: [
      {
        name: "Serie1",
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        name: "Serie2",
        data: [53, 32, 33, 52, 13, 44, 32],
      },
    ],
    chart: {
      type: "bar",
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
    },
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      // ✅ Fix: Ensure DOM is ready before rendering
      if (this.chartdiv?.nativeElement) {
        const chart = new ApexCharts(
          this.chartdiv.nativeElement,
          this.chartOptions
        );
        chart.render();
      }
    }, 0);
  }
}
