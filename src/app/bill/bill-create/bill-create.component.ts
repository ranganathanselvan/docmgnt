import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { BillService } from '../../shared/bill.service';

declare var $: any;  // Declaring $ as a variable so that we can use it to access jQuery

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  providers: [BillService]
})
export class BillCreateComponent implements OnInit {
  enteredId = '';
  enteredBillType = '';
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
  billTypes = ['Medical', 'Household', 'Family', 'Transport', 'Hotel', 'Entertainment', 'Dresses'];
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
    /*this.billService.selectedBill.shopname = this.enteredShopName;
    this.billService.selectedBill.purchaseDate = this.enteredDate;
    this.billService.selectedBill.Cashier = this.enteredCashier;
    this.billService.selectedBill.items = this.enteredProduct;
    this.billService.selectedBill.totalAmount = this.enterBillAmount;*/
    const purDate = this.purchaseDate.nativeElement.value;
    this.enteredDate = purDate;
    const obj = {
      billtype: this.enteredBillType,
      shopname: this.enteredShopName,
      billno: this.enteredBillNo,
      purchasedate: this.enteredDate,
      cashier: this.enteredCashier,
      items: this.enteredProduct,
      totalamount: this.enterBillAmount
    };
    this.billService.postBill(obj).subscribe((res) => {
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
      shopname: '',
      billno: '',
      purchasedate: '',
      cashier: '',
      items: [],
      totalamount: ''
    };
    this.onClearProduct();
  }
}
