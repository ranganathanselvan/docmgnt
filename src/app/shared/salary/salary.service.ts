import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Salary } from './salary.model';
import { CustomUtilityService } from '../custom-utility.service.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  readonly baseURL = this.customUtilityService.baseURL + '/api/salary';

  constructor(private http: HttpClient, private customUtilityService: CustomUtilityService) { }

  postSalary(obj: Salary) {
    return this.http.post(this.baseURL, obj);
  }

  getAllSalary() {
    return this.http.get(this.baseURL);
  }

  putSalaryById(obj: Salary, id: string) {
    return this.http.put(this.baseURL + '?id=' + id, obj);
  }
}
