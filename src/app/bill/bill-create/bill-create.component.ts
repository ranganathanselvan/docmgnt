import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { BillService } from '../../shared/bill.service';


@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  providers: [BillService]
})
export class BillCreateComponent {
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
  billTypes = ['Medical', 'Household', 'Family', 'Transport', 'Hotel', 'Entertainment'];

  constructor(private billService: BillService, private toastr: ToastrService) { }

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
