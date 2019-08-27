export class Bill {
  id: string;
  billtype: string;
  paymentmode: string;
  shopname: string;
  billno: string;
  purchasedate: Date;
  cashier: string;
  items: string[] = [];
  totalamount: string;

}
