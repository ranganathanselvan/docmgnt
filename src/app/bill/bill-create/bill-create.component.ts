import { Component } from '@angular/core';

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html'
})
export class BillCreateComponent {
  enteredShopName = '';
  enteredDate = '';
  enteredCashier = '';
  enteredProductCode = '';
  enteredProductName = '';
  enteredPrice = '';
  enteredQuantity = '';
  enteredTotalPrice = '';
  enteredProduct = [];

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
  }
}
