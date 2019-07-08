import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Bill } from './bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  selectedBill = new Bill();
  bills: Bill[];
  readonly baseURL = 'http://localhost:3000/api/bills';

  constructor(private http: HttpClient) { }

  postBill(obj: any) {
    return this.http.post(this.baseURL, obj);
  }
}
