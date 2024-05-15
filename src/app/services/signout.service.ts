import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SignoutService {

  constructor(private http: HttpClient) { }
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  url: string = environment.ServerUrl
  SignOutMethod(data: any) {
    let url = `${this.url}api/Login/SignOut`
    return this.http.post(url, data,this.headers).pipe()
  }
}
