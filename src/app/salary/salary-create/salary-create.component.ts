import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SalaryService } from '../../shared/salary/salary.service';
import { Salary } from '../../shared/salary/salary.model';

@Component({
  selector: 'app-salary-create',
  templateUrl: './salary-create.component.html',
  styleUrls: ['./salary-create.component.css']
})

export class SalaryCreateComponent implements OnInit {

  monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  yearList = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  earnings = [];
  deductions = [];
  selectedMonth = '';
  selectedYear = 0;
  totalEarnings = 0;
  totalDeductions = 0;
  totalAmount = 0;
  salaryObj: Salary = new Salary();

  constructor(private salaryService: SalaryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.initArrayValues();
  }

  initArrayValues() {
    this.earnings = [{ type: 'Basic Salary', value: 0.00 },
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
    this.deductions = [{ type: 'PF Contribution', value: 0.00 },
    { type: 'PF Arrears', value: 0.00 },
    { type: 'Professional Tax', value: 0.00 },
    { type: 'Income Tax', value: 0.00 },
    { type: 'Infosys Welfare Trust', value: 0.00 },
    { type: 'LWF Contribution', value: 0.00 },
    { type: 'GYM Facilities', value: 0.00 },
    { type: 'MLPL maintenance charges', value: 0.00 },
    { type: 'Transport Deduction', value: 0.00 }];
  }

  onSubmit(form?: NgForm) {
    this.salaryObj.month = this.selectedMonth;
    this.salaryObj.year = this.selectedYear;
    for (const earn of this.earnings) {
      if (earn.value !== 0) {
        this.salaryObj.earnings.push(earn);
      }
    }
    for (const dedu of this.deductions) {
      if (dedu.value !== 0) {
        this.salaryObj.deductions.push(dedu);
      }
    }
    this.salaryObj.earningsamount = this.totalEarnings;
    this.salaryObj.deductionsamount = this.totalDeductions;
    this.salaryObj.netamount = this.totalAmount;

    this.salaryService.postSalary(this.salaryObj).subscribe((res) => {
      this.resetForm(form);
      this.toastr.success('Salary Saved Successfully', 'Success!', {
        positionClass: 'toast-top-center'
      });
      this.salaryObj = new Salary();
      this.initArrayValues();
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  calculateEarnings() {
    this.totalEarnings = 0;
    for (const earn of this.earnings) {
      if (earn.value !== 0) {
        this.totalEarnings = earn.value + this.totalEarnings;
      }
    }
    if (this.totalEarnings > this.totalDeductions) {
      this.totalAmount = this.totalEarnings - this.totalDeductions;
    }
  }

  calculateDeductions() {
    this.totalDeductions = 0;
    for (const dedu of this.deductions) {
      if (dedu.value !== 0) {
        this.totalDeductions = dedu.value + this.totalDeductions;
      }
    }
    if (this.totalEarnings > this.totalDeductions) {
      this.totalAmount = this.totalEarnings - this.totalDeductions;
    }
  }
}
