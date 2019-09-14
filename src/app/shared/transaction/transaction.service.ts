import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  readonly baseURL = 'http://localhost:3000/api/transaction';

  constructor(private http: HttpClient) { }

  postTransaction(obj: Transaction) {
    return this.http.post(this.baseURL, obj);
  }

  getAllTransaction() {
    return this.http.get(this.baseURL);
  }

  getByMonthYear(month: number, year: number) {
    return this.http.get(this.baseURL + '/monthlyexpense/' + month + '/' + year);
  }



  putTransactionById(obj: Transaction, id: string) {
    return this.http.put(this.baseURL + '?id=' + id, obj);
  }

}
