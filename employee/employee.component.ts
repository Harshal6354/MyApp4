import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MasterService } from "../../services/master.service";
import { FormsModule } from "@angular/forms";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-employee",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./employee.component.html",
  styleUrl: "./employee.component.css",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeeComponent {
  myclass: string = "";

  Onclick(role: string) {
    this.service1.onCLassChange.next(role);
    debugger;
  }

  constructor(private service1: MasterService) {
    this.service1.onCLassChange.subscribe((res: string) => {
      debugger;
      this.myclass = res;
    });
  }
  chartOptions = {
    series: [
      {
        name: "Sample Data",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      type: "line",
      height: 350,
    },
    title: {
      text: "Basic Line Chart",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };
}
