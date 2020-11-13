import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//_models
import { User } from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { 
  }
  readUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}` + `/users`);
  }
  saveFoodDetails(item) {
    //console.log(qrcode);
    console.log(item);
    return this.httpClient.post<any>(this.baseUrl +'/users/save',item);
  }
}
