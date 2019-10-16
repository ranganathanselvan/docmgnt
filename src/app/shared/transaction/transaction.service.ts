import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Transaction } from './transaction.model';
import { CustomUtilityService } from '../custom-utility.service.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  readonly baseURL = this.customUtilityService.baseURL + '/api/transaction';

  constructor(private http: HttpClient, private customUtilityService: CustomUtilityService) { }

  postTransaction(obj: Transaction) {
    return this.http.post(this.baseURL, obj);
  }

  getAllTransaction() {
    return this.http.get(this.baseURL);
  }

  getByMonthYear(month: number, year: number) {
    return this.http.get(this.baseURL + '/monthlyexpense/' + month + '/' + year);
  }

  getExpenseDetailsByDesc(month: number, year: number, desc: string) {
    return this.http.get(this.baseURL + '/getExpenseDetailsByDesc/' + month + '/' + year + '/' + desc);
  }


  putTransactionById(obj: Transaction, id: string) {
    return this.http.put(this.baseURL + '?id=' + id, obj);
  }

}
