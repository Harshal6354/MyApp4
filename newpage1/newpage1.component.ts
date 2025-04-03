import { AfterViewInit, Component, ViewChild } from "@angular/core";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
} from "ng-apexcharts";
import { ChartOptions } from "../employee/employee.component";
import { CommonModule } from "@angular/common";
type SelectedData = {
  seriesName: string; // Instead of 'series'
  value: number;
  category: string | number;
  x: number;
  y: number;
};
export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  datalables: ApexDataLabels;
  plotoption: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  colors: string[];
  fill: ApexFill;
  legend: ApexLegend;
  labels: string[];
};
@Component({
  selector: "app-newpage1",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./newpage1.component.html",
  styleUrl: "./newpage1.component.css",
})
export class Newpage1Component implements AfterViewInit {
  @ViewChild("chart") chartdiv!: ChartOptions;

  public chartoptions = {
    series: [
      {
        name: "basic",
        data: [430, 450, 480, 490, 500, 520, 550, 600, 700, 1000],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: [
        "SOUTH-KOREA",
        "LONDON",
        "USA",
        "CANADA",
        "INDIA",
        "CHINA",
        "JAPAN",
        "RUSIA",
        "AFRICA",
        "NEW-ZELAND",
      ],
    },
    plotoption: {
      bar: {
        horizontal: true,
      },
    },
    datalables: {
      enable: true,
    },
  };

  //chart-2
  selectedData: SelectedData | null = null;
  @ViewChild("chart2") chartdiv2!: ChartOptions;

  public chartoptions2 = {
    series: [
      {
        name: "Q1 Budget ",
        group: "budget",
        data: [1000, 2999, 4999, 5999, 6999, 7999],
      },
      {
        name: "Q2 Budget",
        group: "actual",
        data: [3000, 4000, 4500, 5359, 1999, 3499],
      },
      {
        name: "Q3 Budget",
        group: "budget",
        data: [1200, 4999, 5999, 7999, 9999, 5999],
      },
      {
        name: "Q4 Budget",
        group: "actual",
        data: [1500, 6799, 7899, 3999, 5699, 2349],
      },
    ],
    chart: {
      type: "bar",
      stacked: true,
      height: 350,
      events: {
        dataPointSelection: (
          event: MouseEvent | TouchEvent,
          chartContext: ApexChart,
          config: { seriesIndex: number; dataPointIndex: number }
        ) => {
          this.onDataPointClick(event, config);
        },
      },
      animations: { enabled: false },
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    plotoption: {
      bar: {
        horizontal: false,
      },
    },
    stoke: {
      width: 1,
      color: "green",
    },
    title: {},
    xaxis: {
      categories: [2001, 2005, 2006, 2008, 2015, 2018],
    },
    yaxis: {},
    datalable: {
      formatter: (val: number) => {
        return Number(val) / 1000 + "K";
      },
    },
    colors: ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"],
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  //chart3 :area negative chart
  @ViewChild("chart3") chartdiv3!: ChartOptions;

  public chartoption3 = {
    series: [
      {
        name: "Website Blog",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Social Media",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Traffic Sources",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
    ],
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Website Blog",
        },
      },
      {
        opposite: true,
        title: {
          text: "Social Media",
        },
      },
    ],
  };

  ngAfterViewInit(): void {
    const chart = new ApexCharts(
      document.querySelector("#chart"),
      this.chartoptions
    );
    chart.render();
    const chart2 = new ApexCharts(
      document.querySelector("#chart2"),
      this.chartoptions2
    );
    chart2.render();
    const chart3 = new ApexCharts(
      document.querySelector("#chart3"),
      this.chartoption3
    );
    chart3.render();
  }

  onDataPointClick(
    event: MouseEvent | TouchEvent,
    config: { seriesIndex?: number; dataPointIndex?: number }
  ) {
    if (
      typeof config.seriesIndex !== "number" ||
      typeof config.dataPointIndex !== "number"
    ) {
      return;
    }

    const seriesIndex = config.seriesIndex;
    const dataPointIndex = config.dataPointIndex;

    const seriesName =
      this.chartoptions2.series[seriesIndex]?.name ?? "unknown";
    const value =
      this.chartoptions2.series[seriesIndex]?.data[dataPointIndex] ?? 0;
    const category =
      this.chartoptions2.xaxis.categories[dataPointIndex] ?? "NA";

    this.selectedData = {
      seriesName,
      value,
      category,
      x: (event as MouseEvent).clientX,
      y: (event as MouseEvent).clientY,
    };

    console.log(this.selectedData);
  }

  closePopup() {
    this.selectedData = null;
  }
}
