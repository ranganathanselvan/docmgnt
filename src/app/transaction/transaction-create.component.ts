import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Transaction } from '../shared/transaction/transaction.model';
import { TransactionService } from '../shared/transaction/transaction.service';
import { CustomUtilityService } from '../shared/custom-utility.service.service';
declare var $: any;  // Declaring $ as a variable so that we can use it to access jQuery

@Component({
  selector: 'app-create-transaction',
  templateUrl: './transaction-create.component.html',
  providers: [TransactionService]
})

export class CreateTransactionComponent implements OnInit {

  transactionTypes = this.customUtilityService.transactionTypes;
  transactionDesc = this.customUtilityService.transactionDesc;
  selectedTransactionType = '---Select Transaction Type---';
  enteredTransDesc = '---Select Description---';
  enteredTransDate = '';
  enteredTransAmount = '';
  enteredTransComment = '';
  transactionData = new Array();
  transObj: Transaction = new Transaction();
  config: any;
  collection = { count: 0, data: [] };

  @ViewChild('TransDate', { static: false }) TransDate: ElementRef;
  constructor(
    private transService: TransactionService,
    private toastr: ToastrService,
    private customUtilityService: CustomUtilityService) { }

  ngOnInit() {
    $(
      function () {
        $('#inputTransDate').datepicker({ dateFormat: 'dd/mm/yy' });
      }
    );
    this.loadAllTrans();
  }

  loadAllTrans() {
    this.transService.getAllTransaction().subscribe((res) => {
      this.transactionData = Object.keys(res).map(i => res[i]);
      this.collection.count = this.transactionData.length;
      this.collection.data = this.transactionData;

      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.collection.count
      };
      console.log(JSON.stringify(res));
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  onSubmit(form?: NgForm) {

    const inDate = this.TransDate.nativeElement.value;
    const date = inDate.split('/');

    this.transObj.transactiontype = this.selectedTransactionType;
    this.transObj.description = this.enteredTransDesc;
    this.transObj.date = new Date(date[1] + '/' + date[0] + '/' + date[2]);
    this.transObj.amount = Number(this.enteredTransAmount);
    this.transObj.comment = this.enteredTransComment;
    if (this.transactionTypes[0] === this.selectedTransactionType) {
      this.transObj.balance = Number(this.transactionData[this.transactionData.length - 1].balance) - Number(this.enteredTransAmount);
    } else if (this.transactionTypes[1] === this.selectedTransactionType) {
      this.transObj.balance = Number(this.transactionData[this.transactionData.length - 1].balance) + Number(this.enteredTransAmount);
    }
    this.transObj.balance = Number(this.transObj.balance.toFixed(2));

    this.transService.postTransaction(this.transObj).subscribe((res) => {
      this.resetForm(form);
      this.toastr.success('Transaction Saved Successfully', 'Success!', {
        positionClass: 'toast-top-center'
      });
      this.loadAllTrans();
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
}
