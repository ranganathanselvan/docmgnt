import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomUtilityService {

  constructor() { }

  baseURL = 'https://quiet-lake-20402.herokuapp.com';
  // baseURL = 'http://localhost:3000';

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

    month: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    year: number[] = [
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025
    ];

    monthByLiteral = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    };

    monthById = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };
}
