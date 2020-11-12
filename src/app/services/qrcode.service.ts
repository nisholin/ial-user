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
 baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient, private globalsURL: ServerURL) { }

//nodejs
/* sendQrcode(qrcode) {
  console.log(qrcode);
  return this.httpClient.post<any>(this.baseUrl + '/users',qrcode);
  } */
  sendQrcode(qrcode): Observable<User[]> {
    return this.httpClient.post<User[]>(`http://localhost:3000/api/users`,{qrcode});
}
readQrcode(qrcode): Observable<User[]> {
  return this.httpClient.get<User[]>(`${this.baseUrl}` + `/users/`+qrcode)
}
}