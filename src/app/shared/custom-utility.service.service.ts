import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomUtilityService {

  constructor() { }

  catagory: string[] =
    [
      'Medical',
      'Household',
      'Family',
      'Transport',
      'Hotel',
      'Entertainment',
      'Dresses',
      'Others'
    ];

  paymentMode: string[] =
    [
      'Credit Card',
      'Debit Card',
      'Cash'
    ];

  transactionTypes: string[] =
    [
      'Expense',
      'Income'
    ];

  transactionDesc: string[] =
    [
      'Salary',
      'Borrowed',
      'Other',
      'Medical',
      'Household',
      'Family',
      'Transport',
      'Hotel',
      'Entertainment',
      'Dresses',
      'Mobile',
      'House Rent',
      'Credit Card',
      'Savings'
    ];
}
