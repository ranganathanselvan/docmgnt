import { Component, OnInit } from '@angular/core';

import { BillService } from '../../shared/bill.service';
import { Bill } from '../../shared/bill.model';

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  providers: [BillService]
})
export class BillViewComponent implements OnInit {
  billData = new Array();
  selectedBill = {};

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.billService.getAllBill().subscribe((res) => {
      this.billData = Object.keys(res).map(i => res[i]);
      console.log(JSON.stringify(res));
    });
  }

  getRowIndex(index) {
    console.log('Row Index: ' + index);
    this.selectedBill = this.billData[index];
  }
}
