import { Component } from '@angular/core';

@Component({
  selector: 'app-salary-create',
  templateUrl: './salary-create.component.html'
})

export class SalaryCreateComponent {

  monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  yearList = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  earnings = [{ type: 'Basic Salary', value: 0.00 },
  { type: 'Fixed Dearness Allowance', value: 0.00 },
  { type: 'House Rent Allowance', value: 0.00 },
  { type: 'Medical Allowance', value: 0.00 },
  { type: 'Transport Allowance', value: 0.00 },
  { type: 'Leave Travel Allowance', value: 0.00 },
  { type: 'BonusExgratia-AdvancePmt', value: 0.00 },
  { type: 'Performance Bonus', value: 0.00 },
  { type: 'Salary Arrears', value: 0.00 },
  { type: 'Annual Bonus/ Ex-gratia', value: 0.00 },
  { type: 'Unavailed Meal Voucher', value: 0.00 }];
  detections = [{type: 'PF Contribution', value: 0.00},
  {type: 'PF Arrears', value: 0.00},
  {type: 'Professional Tax', value: 0.00},
  {type: 'Income Tax', value: 0.00},
  {type: 'Infosys Welfare Trust', value: 0.00},
  {type: 'LWF Contribution', value: 0.00},
  {type: 'GYM Facilities', value: 0.00},
  {type: 'MLPL maintenance charges', value: 0.00},
  {type: 'Transport Deduction', value: 0.00}];
  selectedMonth = '';
  selectedYear = '';

  onSubmit() {
    console.log(this.earnings);
    console.log(this.detections);
  }
}
