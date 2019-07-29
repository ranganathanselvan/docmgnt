import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Income } from '../../shared/income/income.model';
import { IncomeService } from '../../shared/income/income.service';
declare var $: any;  // Declaring $ as a variable so that we can use it to access jQuery

@Component({
  selector: 'app-create-income',
  templateUrl: './income-create.component.html',
  providers: [IncomeService]
})
export class CreateIncomeComponent implements OnInit {
  incomeTypes = ['Salary', 'Barrowed', 'Others'];
  selectedIncomeType = '';
  enteredIncomeDate = '';
  enteredIncomeAmount = '';
  enteredIncomeComment = '';
  incomeObj: Income = new Income();
  incomeData = new Array();

  @ViewChild('IncomeDate', { static: false }) incomedate: ElementRef;
  constructor(private incomeService: IncomeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    $(
      function () {
        $('#inputIncomeDate').datepicker({ dateFormat: 'dd/mm/yy' });
      }
    );
    this.incomeService.getAllIncome().subscribe((res) => {
      this.incomeData = Object.keys(res).map(i => res[i]);
      console.log(JSON.stringify(res));
    });
  }

  onSubmit(form?: NgForm) {
    const inDate = this.incomedate.nativeElement.value;
    const date = inDate.split('/');

    this.incomeObj.incometype = this.selectedIncomeType;
    this.incomeObj.date = new Date(date[1] + '/' + date[0] + '/' + date[2]);
    this.incomeObj.amount = Number(this.enteredIncomeAmount);
    this.incomeObj.comment = this.enteredIncomeComment;

    this.incomeService.postIncome(this.incomeObj).subscribe((res) => {
      this.resetForm(form);
      this.toastr.success('Income Saved Successfully', 'Success!', {
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
