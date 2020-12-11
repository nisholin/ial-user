import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//services
import { QrcodeService } from '../services/qrcode.service';
import { HomeService } from "../services/home.service";
//_models
import { User } from '../_models/user';
//custom imports
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data ="bruce";
  model: any = {};
  //user:User;

  today= new Date();
  todaysDataTime = '';
  user: User[];
  userList: any;
	//selectedUser: User = {  qrcode: null}

  constructor(
    private qrcodeService: QrcodeService,
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
   
   }

  ngOnInit(): void {
    //this.todaysDataTime = formatDate(this.today, 'hh:mm a', 'en-US', '+0530');
    this.todaysDataTime = new Date().toLocaleTimeString();
  }
  readQrCode(qrcode){
    //alert("QRcode--->"+qrcode);
    this.qrcodeService.readQrcode(qrcode).subscribe((users: User[])=>{
      this.userList = users;
      console.log("Users-->"+this.userList.length);
    });
    localStorage.setItem("qrcode",qrcode);
    this.router.navigateByUrl('/home');
  }
}
