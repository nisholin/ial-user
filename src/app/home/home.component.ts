import { formatDate } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingviewComponent } from '../bookingview/bookingview.component';
//services
import { HomeService } from "../services/home.service";
import { QrcodeService } from '../services/qrcode.service';
//_models
import { User } from '../_models/user';
import { Fooddetails } from '../_models/fooddetails';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  userdiv: boolean;
  amountdiv: boolean;
  model: any = {};
  today= new Date();
  todaysDataTime = '';
  users:User[];
  user: any;
  fooddetails:Fooddetails;
  //users: User[];
  fieldArray: Array<any> = [];

  //itemname : string ="Cool Drinks";
  itemname2 : string ="Burger";
  itemname3 : string ="Dessrets";

  userList: any = {};
  foodList: any = {};
  require: any;
  @Input() userss:User;
  constructor(
    public router : Router,
    config: NgbModalConfig, private modalService: NgbModal,
    private qrcodeService: QrcodeService,
    private homeService: HomeService,
  ) {
    this.todaysDataTime = formatDate(this.today, 'hh:mm a', 'en-US', '+0530');
    config.backdrop = 'static';
    config.keyboard = false;

    let qrcode = localStorage.getItem("qrcode");
    alert("user"+qrcode);
    this.qrcodeService.readQrcode(qrcode).subscribe((users: User[])=>{
      this.userList = users;
      console.log("Users-->"+this.userList.length);
    });

    /* const userdata = require("src/app/userdata.json");
    this.userList=userdata;    */  
    
    const fooddetils = require("src/app/fooddetils.json");
    this.foodList=fooddetils; 
    this.todaysDataTime = formatDate(this.today, 'hh:mm a', 'en-US', '+0530');
    this.homeService.readUser().subscribe((user: User[])=>{
      this.user = user;
      console.log(this.user);
    });

  }
   

  ngOnInit(): void {
    this.userdiv = true;
    this.amountdiv = false;

    this.model.qty = 1;
    this.model.qty2 = 1;
    this.model.qty3 = 1;
    
    this.model.item1 = 1;
    this.model.item2 = 2;
    this.model.item3 = 3;
    
//this.readUserDetails();
  }
  /* userDivOpen() {
    this.userdiv = true;
  } */

  amountDivOpen(itemname,quantity,itemvalue) {
    if(quantity==0){
      //alert("Please select quantity");
    }else{
    this.amountdiv = true;
    if(itemvalue == 1){
      this.fieldArray.push( { itemvalue: itemvalue, itemName: itemname, qty: quantity } );
      this.model.item1 = 11;
    }
    if(itemvalue == 2){
      this.fieldArray.push( { itemvalue: itemvalue, itemName: itemname, qty: quantity } );
      this.model.item2 = 22;
    }
    if(itemvalue == 3){
      this.fieldArray.push( { itemvalue: itemvalue, itemName: itemname, qty: quantity } );
      this.model.item3 = 33;
    }
    //this.fieldArray.push( { itemName: itemname, qty: quantity } );
    console.log(this.fieldArray);
  }
  }

  deleteFieldValue(index,itemvalue) {
    if(this.fieldArray.length == 0) {  
      this.amountdiv = false;  
    } else { 
      if(itemvalue == 1){
        this.model.item1 = 1;
      }
      if(itemvalue == 2){
        this.model.item2 = 2;
      }
      if(itemvalue == 3){
        this.model.item3 = 3;
      }
      this.fieldArray.splice(index, 1);
    }
  }

  up(max,i) {
    if(i == 1){
      this.model.qty = parseInt(this.model.qty)+1;
      if(this.model.qty >= parseInt(max)) {
        this.model.qty = max;
      }
    }else if(i == 2){
      this.model.qty2 = parseInt(this.model.qty2)+1;
      if(this.model.qty2 >= parseInt(max)) {
        this.model.qty2 = max;
      }
    }else if(i == 3){
      this.model.qty3 = parseInt(this.model.qty3)+1;
      if(this.model.qty3 >= parseInt(max)) {
        this.model.qty3 = max;
      }
    }
  }

  down(min,i) {
    if(i == 1){
      this.model.qty = parseInt(this.model.qty)-1;
      if(this.model.qty < 1) {
        this.model.qty = min;
      }
    }else if(i == 2){
      this.model.qty2 = parseInt(this.model.qty2)-1;
      if(this.model.qty2 < 1) {
        this.model.qty2 = min;
      }
    }else if(i == 3){
      this.model.qty3 = parseInt(this.model.qty3)-1;
      if(this.model.qty3 < 1) {
        this.model.qty3 = min;
      }
    }
  }
  amountDetailsSave(item: any) {
    let qrcode = localStorage.getItem("qrcode");
    //console.log(qrcode);
    this.homeService.saveFoodDetails(qrcode,item).subscribe(()=>{
    });
    const modalRef = this.modalService.open(BookingviewComponent, { windowClass: 'modal-class'});
    let data: any;
    data = {
      item: item
    };
    modalRef.componentInstance.fromParent = data;
    setTimeout(() => {
      modalRef.close()
      this.router.navigate(['/home']);
    }, 3000);
    //this.router.navigate(['/bookingview']);
  } 
	/* amountDetailsSave(items){
    alert("item name-->"+items.length);
			this.qrcodeService.updateAmountDetails(items).subscribe((fooddetails: Fooddetails)=>{
		});
} */

  amountDetailsCancel() {
    this.amountdiv = false;
  }
}
