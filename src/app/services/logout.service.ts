import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http:HttpClient) { }
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  checkemailexists(Email:any){
    debugger
    let url = environment.ServerUrl+"api/Login/checkemailexists";;
    return this.http.post(url,Email,this.headers).pipe();
  }

  SendOtp(Email:any){
      
    let url = environment.ServerUrl+"api/Login/getotp";;
    return this.http.post(url,Email,this.headers).pipe();
  }

  SubmitOtp(details:any){
      
    let url = environment.ServerUrl+"api/Login/verifyotp";
    return this.http.post(url,details,this.headers).pipe();
  }
  
  resetPassword(details:any){
    let url = environment.ServerUrl+"api/Login/ResetEmployeePassword";
    return this.http.post(url,details,this.headers).pipe();
  }

  GenerateLog(details:any){
    let url = environment.ServerUrl+"api/Login/EmpLogOut";
    return this.http.post(url,details,this.headers).pipe();
  }

}
