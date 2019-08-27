import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { BillService } from '../../shared/bill.service';
import { Bill } from '../../shared/bill.model';
import { Custom } from '../../shared/custom.model';

declare var $: any;  // Declaring $ as a variable so that we can use it to access jQuery


@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  providers: [BillService],
  styles: [`
    .btn-margin{
      margin: 5px;
    }
  `]
})
export class BillCreateComponent implements OnInit {
  enteredId = '';
  enteredBillType = '';
  enteredPaymentMode = '';
  enteredShopName = '';
  enteredBillNo = '';
  enteredDate = '';
  enteredCashier = '';
  enteredProductCode = '';
  enteredProductName = '';
  enteredPrice = '';
  enteredQuantity = '';
  enteredTotalPrice = '';
  enterBillAmount = '';
  enteredProduct = [];
  billObj: Bill = new Bill();
  custom: Custom = new Custom();
  billTypes = this.custom.catagory;
  paymentMode = this.custom.paymentMode;
  @ViewChild('purchaseDate', { static: false }) purchaseDate: ElementRef;

  constructor(private billService: BillService, private toastr: ToastrService) { }

  ngOnInit(): void {
    $(
      function () {
        $('#inputDateOfPurchase').datepicker({ dateFormat: 'dd/mm/yy' });
      }
    );
  }

  onAddProduct() {
    let productObj = {
      ProductCode: this.enteredProductCode, ProductName: this.enteredProductName,
      Price: this.enteredPrice, Quantity: this.enteredQuantity, TotalPrice: this.enteredTotalPrice
    };
    this.enteredProduct.push(productObj);
    this.enterBillAmount = String(Number(this.enteredTotalPrice) + Number(this.enterBillAmount || '0'));
    productObj = {
      ProductCode: '', ProductName: '',
      Price: '', Quantity: '', TotalPrice: ''
    };
    this.enteredProductCode = '';
    this.enteredProductName = '';
    this.enteredPrice = '';
    this.enteredQuantity = '';
    this.enteredTotalPrice = '';
  }
  onClearProduct() {
    this.enteredProduct = [];
    this.enteredProductCode = '';
    this.enteredProductName = '';
    this.enteredPrice = '';
    this.enteredQuantity = '';
    this.enteredTotalPrice = '';
    this.enterBillAmount = '';
  }

  onSubmit(form?: NgForm) {
    const purDate = this.purchaseDate.nativeElement.value;
    const date = purDate.split('/');

    this.billObj.billtype = this.enteredBillType;
    this.billObj.shopname = this.enteredShopName;
    this.billObj.paymentmode = this.enteredPaymentMode;
    this.billObj.billno = this.enteredBillNo;
    this.billObj.purchasedate = new Date(date[1] + '/' + date[0] + '/' + date[2]);
    this.billObj.cashier = this.enteredCashier;
    this.billObj.items = this.enteredProduct;
    this.billObj.totalamount = this.enterBillAmount;

    this.billService.postBill(this.billObj).subscribe((res) => {
      this.resetForm(form);
      this.toastr.success('Bill Saved Successfully', 'Success!', {
        positionClass: 'toast-top-center'
      });
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.billService.selectedBill = {
      id: '',
      billtype: '',
      paymentmode: '',
      shopname: '',
      billno: '',
      purchasedate: new Date(),
      cashier: '',
      items: [],
      totalamount: ''
    };
    this.onClearProduct();
  }

  calculateProductTotalPrice() {
    if (this.enteredPrice !== '' && this.enteredQuantity !== '') {
      this.enteredTotalPrice = String(Number(this.enteredPrice) * Number(this.enteredQuantity));
    }
  }
}
