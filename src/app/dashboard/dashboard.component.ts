import { Component, OnInit } from '@angular/core';
import { QrcodeService } from '../services/qrcode.service';
import { User } from '../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
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
  users: User[];
  user: any;
	//selectedUser: User = {  qrcode: null}

  constructor(
    private qrcodeService: QrcodeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.todaysDataTime = formatDate(this.today, 'hh:mm a', 'en-US', '+0530');
   }

  ngOnInit(): void {
  }

  saveQRCode(qrcode){
	this.qrcodeService.checkproduct(qrcode).subscribe((user: User)=>{
		console.log("Product deleted, ", qrcode);
  });
}



	 /* this.qrcodeService.readUser(qrcode)
  .subscribe(
   data => { 
        this.user=data;
      },
      error => {
      // alert('Network issue please try again');
      }
    );
  } */
  saveQrCode(qrcode){
    alert("QRcode--->"+qrcode);
    this.qrcodeService.readUserDetails(qrcode).subscribe((users: User[])=>{
      this.user = users;
      console.log("Users-->"+this.user);
    });
    this.router.navigateByUrl('/home');
  }
}
