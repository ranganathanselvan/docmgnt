import { Component, Input } from '@angular/core';
import { Salary } from 'src/app/shared/salary/salary.model';


@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html'
})

export class SalaryDetailsComponent {
  @Input() salaryElement: Salary;
}
