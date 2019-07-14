import { Component, OnInit } from '@angular/core';

import { BillService } from '../../shared/bill.service';

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  providers: [BillService]
})
export class BillViewComponent implements OnInit {
  billData = new Object();

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.billService.getAllBill().subscribe((res) => {
      this.billData = res;
      console.log(JSON.stringify(res));
    });
  }
}
