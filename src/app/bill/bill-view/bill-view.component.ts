import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BillService } from '../../shared/bill.service';
import { Bill } from '../../shared/bill.model';

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.css'],
  providers: [BillService]
})
export class BillViewComponent implements OnInit {
  billData = new Array();
  selectedBill = { items: [], shopname: '', totalamount: '' };
  enteredProductCode = '';
  enteredProductName = '';
  enteredPrice = '';
  enteredQuantity = '';
  enteredTotalPrice = '';
  selectedIndex = '';
  collection: any[];
  p = 1;
  count = 10;

  constructor(private billService: BillService, private toastr: ToastrService) { }

  ngOnInit() {
    this.billService.getAllBill().subscribe((res) => {
      this.billData = Object.keys(res).map(i => res[i]);
      this.collection = this.billData;

      console.log(JSON.stringify(res));
    });
  }

  pageChanged(event) {
    this.p = event;
  }

  getRowIndex(index) {
    let currentIndex = 0;
    if (this.p > 1) {
      currentIndex = ((this.p - 1) * this.count) + index;
    } else {
      currentIndex = index;
    }
    console.log('Row clicked Index: ' + currentIndex);
    this.selectedBill = this.billData[currentIndex];
  }

  deleteBillItem(index) {
    this.selectedBill.items.splice(index, 1);
  }

  addBillItem() {
    let productObj = {
      ProductCode: this.enteredProductCode, ProductName: this.enteredProductName,
      Price: this.enteredPrice, Quantity: this.enteredQuantity, TotalPrice: this.enteredTotalPrice
    };
    if (this.selectedIndex !== '') {
      this.selectedBill.items[this.selectedIndex].ProductCode = this.enteredProductCode;
      this.selectedBill.items[this.selectedIndex].ProductName = this.enteredProductName;
      this.selectedBill.items[this.selectedIndex].Price = this.enteredPrice;
      this.selectedBill.items[this.selectedIndex].Quantity = this.enteredQuantity;
      this.selectedBill.items[this.selectedIndex].TotalPrice = this.enteredTotalPrice;

    } else {
      this.selectedBill.items.push(productObj);
    }
    this.selectedBill.totalamount = this.calculateBillTotalAmount();
    productObj = {
      ProductCode: '', ProductName: '',
      Price: '', Quantity: '', TotalPrice: ''
    };
    this.selectedIndex = '';
    this.enteredProductCode = '';
    this.enteredProductName = '';
    this.enteredPrice = '';
    this.enteredQuantity = '';
    this.enteredTotalPrice = '';
  }

  editselectedBillItem(index) {
    const item = this.selectedBill.items[index];
    this.selectedIndex = index;
    this.enteredProductCode = item.ProductCode;
    this.enteredProductName = item.ProductName;
    this.enteredPrice = item.Price;
    this.enteredQuantity = item.Quantity;
    this.enteredTotalPrice = item.TotalPrice;
  }

  updateSelectedBill(billObj: any) {
    this.billService.putBillById(billObj, billObj._id).subscribe((res) => {
      this.toastr.success('Bill updated Successfully', 'Success!', {
        positionClass: 'toast-top-center'
      });
    });
  }
  calculateBillTotalAmount(): any {
    let amount = 0;
    if (this.selectedBill !== null && this.selectedBill.items.length > 0) {
      for (const item of this.selectedBill.items) {
        amount = amount + Number(item.TotalPrice);
      }
    }
    return amount;
  }

  calculateProductTotalPrice() {
    if (this.enteredPrice !== '' && this.enteredQuantity !== '') {
      this.enteredTotalPrice = String(Number(this.enteredPrice) * Number(this.enteredQuantity));
    }
  }
}

