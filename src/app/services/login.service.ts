import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  
  Loginempdata(details : any)
  {
     
    let url = environment.ServerUrl+"api/Login/LoginHrms";
    return this.http.post(url,details,this.headers).pipe();
  }

  GenerateLog(log:any){
    let url = environment.ServerUrl+"api/Login/EmpLog";
    return this.http.post(url,log,this.headers).pipe();
  }

}
