import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Salary } from '../../shared/salary/salary.model';
import { SalaryService } from '../../shared/salary/salary.service';

@Component({
  selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
  providers: [SalaryService]
})

export class SalaryViewComponent implements OnInit {
  salaryData: Salary[] = new Array();
  collection: any[];
  p = 1;
  count = 12;
  salaryObj: Salary = new Salary();

  constructor(private salaryService: SalaryService, private toastr: ToastrService) { }

  ngOnInit() {
    this.salaryService.getAllSalary().subscribe((res) => {
      this.salaryData = Object.keys(res).map(i => res[i]);
      this.collection = this.salaryData;

      console.log(JSON.stringify(res));
    });
  }

  pageChanged(event) {
    this.p = event;
  }
  onAssignIndividualSalary(index) {
    let currentIndex = 0;
    if (this.p > 1) {
      currentIndex = ((this.p - 1) * this.count) + index;
    } else {
      currentIndex = index;
    }
    console.log(currentIndex);
    this.salaryObj = this.salaryData[currentIndex];
  }
}
