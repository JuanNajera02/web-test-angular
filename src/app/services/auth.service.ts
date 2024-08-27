import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { url } from '../url';
import { creds } from '../modules/auth/pages/login/models/creds';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  createAccount(user:any):Observable<any>{
    return this.http.post(`${url}/api/Client/AddClient`,user)
  }

  login(creds: creds): Observable<any> {
    return this.http.post(`${url}/api/Client/Login`,creds)
  }


}



