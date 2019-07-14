import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillCreateComponent } from './bill/bill-create/bill-create.component';
import { BillViewComponent } from './bill/bill-view/bill-view.component';
import { HeaderComponent } from './header/header.component';
import { CreateIncomeComponent } from './income/income-create/income-create.component';
import { ExpenseCreateComponent } from './expense/expense-create/expense-create.component';
import { NavBarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    BillCreateComponent,
    BillViewComponent,
    CreateIncomeComponent,
    ExpenseCreateComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'Bill', component: BillCreateComponent},
      {path: 'Bill/show', component: BillViewComponent},
      {path: 'Income', component: CreateIncomeComponent},
      {path: 'Expense', component: ExpenseCreateComponent}
    ]),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
