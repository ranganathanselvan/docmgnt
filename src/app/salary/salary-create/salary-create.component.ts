import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SalaryService } from '../../shared/salary/salary.service';
import { Salary } from '../../shared/salary/salary.model';

@Component({
  selector: 'app-salary-create',
  templateUrl: './salary-create.component.html',
  styleUrls: ['./salary-create.component.css']
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
  deductions = [{ type: 'PF Contribution', value: 0.00 },
  { type: 'PF Arrears', value: 0.00 },
  { type: 'Professional Tax', value: 0.00 },
  { type: 'Income Tax', value: 0.00 },
  { type: 'Infosys Welfare Trust', value: 0.00 },
  { type: 'LWF Contribution', value: 0.00 },
  { type: 'GYM Facilities', value: 0.00 },
  { type: 'MLPL maintenance charges', value: 0.00 },
  { type: 'Transport Deduction', value: 0.00 }];
  selectedMonth = '';
  selectedYear = 0;
  totalEarnings = 0;
  totalDeductions = 0;
  totalAmount = 0;
  salaryObj: Salary = new Salary();

  constructor(private salaryService: SalaryService, private toastr: ToastrService) { }

  onSubmit(form?: NgForm) {
    this.salaryObj.month = this.selectedMonth;
    this.salaryObj.year = this.selectedYear;
    this.salaryObj.earnings = this.earnings;
    this.salaryObj.deductions = this.deductions;
    this.salaryObj.earningsamount = this.totalEarnings;
    this.salaryObj.deductionsamount = this.totalDeductions;
    this.salaryObj.netamount = this.totalAmount;

    this.salaryService.postSalary(this.salaryObj).subscribe((res) => {
      this.resetForm(form);
      this.toastr.success('Salary Saved Successfully', 'Success!', {
        positionClass: 'toast-top-center'
      });
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
}
