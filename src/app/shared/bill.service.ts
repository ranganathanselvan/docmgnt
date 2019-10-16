import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Bill } from './bill.model';
import { CustomUtilityService } from './custom-utility.service.service';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  selectedBill: Bill = new Bill();

  readonly baseURL = this.customUtilityService.baseURL + '/api/bills';

  constructor(private http: HttpClient, private customUtilityService: CustomUtilityService) { }

  postBill(obj: any) {
    return this.http.post(this.baseURL, obj);
  }

  getAllBill() {
    return this.http.get(this.baseURL);
  }

  putBillById(obj: any, id: string) {
    return this.http.put(this.baseURL + '?id=' + id, obj);
  }
}
