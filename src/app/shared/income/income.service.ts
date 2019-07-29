import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Income } from './income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  readonly baseURL = 'http://localhost:3000/api/incomes';

  constructor(private http: HttpClient) { }

  postIncome(obj: any) {
    return this.http.post(this.baseURL, obj);
  }

  getAllIncome() {
    return this.http.get(this.baseURL);
  }

  putIncomeById(obj: any, id: string) {
    return this.http.put(this.baseURL + '?id=' + id, obj);
  }
}
