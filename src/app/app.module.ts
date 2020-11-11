import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { QrcodeService } from './services/qrcode.service';
import { ServerURL } from './services/url.service';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingviewComponent } from './bookingview/bookingview.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ModalModule } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BookingviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    //NgbModule,
    //ModalModule.forRoot(),
  ],
  providers: [ServerURL,QrcodeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
