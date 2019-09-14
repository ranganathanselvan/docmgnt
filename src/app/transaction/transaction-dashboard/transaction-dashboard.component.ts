import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { TransactionService } from 'src/app/shared/transaction/transaction.service';
import { CustomUtilityService } from 'src/app/shared/custom-utility.service.service';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.css'],
  providers: [TransactionService]
})
export class TransactionDashboardComponent implements OnInit {

  /* -------------Chart Variables and Function---------------*/
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = []; // = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [{ data: [], label: '' }]; /*[
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];*/
  monthTotalExpense = 0;
  ChartData = { xValues: [], yValue: [] };
  /* -------------END Chart Variables and Function---------------*/

  expenseList: any[] = [];
  monthList: string[] = this.customUtilityService.month;
  yearList: number[] = this.customUtilityService.year;
  selectedMonth = 'Choose...';
  selectedYear = 'Choose...';

  constructor(private transService: TransactionService, private customUtilityService: CustomUtilityService) { }

  ngOnInit() {
    const today = new Date();
    this.getExpenseByMonthYear(today.getMonth() + 1, today.getFullYear());
    this.selectedMonth = this.customUtilityService.monthById[today.getMonth() + 1];
    this.selectedYear = today.getFullYear().toString();
  }

  getExpenseByMonthYear(month: number, year: number) {
    this.monthTotalExpense = 0;
    this.transService.getByMonthYear(month, year).subscribe((res) => {
      this.expenseList = Object.keys(res).map(i => res[i]);
      this.ChartData.xValues = Object.keys(res).map(i => res[i]._id.desc);
      this.ChartData.yValue = Object.keys(res).map(i => res[i].total);

      this.barChartLabels = this.ChartData.xValues;
      this.barChartData = [
        {
          data: this.ChartData.yValue,
          label: 'Series for the month ' + this.customUtilityService.monthById[month] + ' - ' + year
        }];

      for (const i of this.ChartData.yValue) {
        this.monthTotalExpense = this.monthTotalExpense + i;
      }
      this.monthTotalExpense = (Math.round(this.monthTotalExpense * 100) / 100);
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  onChangeMonthYear() {
    this.getExpenseByMonthYear(
      this.customUtilityService.monthByLiteral[this.selectedMonth],
      Number(this.selectedYear));
  }

  onPrevious() {

    if (this.selectedMonth === 'January') {
      this.selectedMonth = 'December';
      this.selectedYear = (Number(this.selectedYear) - 1).toString();
    } else {
      const monthId = this.customUtilityService.monthByLiteral[this.selectedMonth];
      this.selectedMonth = this.customUtilityService.monthById[monthId - 1];
    }
    this.getExpenseByMonthYear(
      this.customUtilityService.monthByLiteral[this.selectedMonth],
      Number(this.selectedYear));
  }

  onNext() {
    if (this.selectedMonth === 'December') {
      this.selectedMonth = 'January';
      this.selectedYear = (Number(this.selectedYear) + 1).toString();
    } else {
      const monthId = this.customUtilityService.monthByLiteral[this.selectedMonth];
      this.selectedMonth = this.customUtilityService.monthById[monthId + 1];
    }

    this.getExpenseByMonthYear(
      this.customUtilityService.monthByLiteral[this.selectedMonth],
      Number(this.selectedYear));
  }

}
