import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { ServerURL } from './url.service';
import { Observable } from 'rxjs';
import { Fooddetails } from '../_models/fooddetails';


@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

 // private commonURL = this.globalsURL.serverURL;
 PHP_API_SERVER = "http://192.168.200.49/ial_canteen";

  constructor(private http: HttpClient, private globalsURL: ServerURL) { }

  //saveQrCode(model: any){
   // console.log("QR Code -->"+model.qrcode);
  ///  return this.http.post<User>(this.commonURL+'saveQrCode',model);
   // return this.http.post<User>(`${this.PHP_API_SERVER}/create_product.php`, product);
  //}
  readUserDetails(qrcode:any): Observable<User[]>{
    alert("qrcode--->"+qrcode);
    return this.http.get<User[]>(`${this.PHP_API_SERVER}/canteen/employee_check.php`);
	}
	readUser(qrcode: number): Observable<User>{
		return this.http.post<User>(`${this.PHP_API_SERVER}/qrcode.php`, qrcode);
  }
  //save food details
	updateAmountDetails(item: any){
    alert("Length-->"+item.length);
		return this.http.put<Fooddetails>(`${this.PHP_API_SERVER}/update_product.php`, item);
	}
	deleteProduct(id: number){
		return this.http.delete<User>(`${this.PHP_API_SERVER}/delete_product.php/?id=${id}`);
  }
  //send qrcode
  checkproduct(qrcode: number){
		return this.http.delete<User>(`${this.PHP_API_SERVER}/canteen/employee_check.php/?rfid=${qrcode}`);
	}

}