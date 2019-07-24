import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var $: any;  // Declaring $ as a variable so that we can use it to access jQuery

@Component({
  selector: 'app-create-income',
  templateUrl: './income-create.component.html'
})
export class CreateIncomeComponent implements OnInit {
  incomeTypes = ['Salary', 'Barrowed', 'Others'];
  selectedIncomeType = '';
  enteredIncomeDate = '';
  enteredIncomeAmount = '';
  enteredIncomeComment = '';

  @ViewChild('IncomeDate', { static: false }) incomedate: ElementRef;

  ngOnInit(): void {
    $(
      function () {
        $('#inputIncomeDate').datepicker({ dateFormat: 'dd/mm/yy' });
      }
    );
  }

  onSubmit() {
    let inDate = this.incomedate.nativeElement.value;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
}
