import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillCreateComponent } from './bill/bill-create/bill-create.component';
import { BillViewComponent } from './bill/bill-view/bill-view.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CreateTransactionComponent } from './transaction/transaction-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BillCreateComponent,
    BillViewComponent,
    HomeComponent,
    CreateTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'Bill', component: BillCreateComponent },
      { path: 'Bill/show', component: BillViewComponent },
      { path: 'Transaction', component: CreateTransactionComponent }
    ]),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
