import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApplyLeaveService {

  constructor(private http:HttpClient) { }
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  url:string = environment.ServerUrl;
  //Apply For Leave
  ApplyLeave(data:any){
    let url = `${this.url}api/utilities/applyLeave`
    return this.http.post(url,data,this.headers).pipe();
  }
  
  //Employee Leave/Leaves
  EmpLeave(data:any){
    let url = `${this.url}api/utilities/EmpLeave`
    return this.http.post(url,data,this.headers).pipe();
  }
  //Subordinate Leave/Leaves
  SubordinateLeave(data:any){
    let url = `${this.url}api/utilities/SubordinateLeave`
    return this.http.post(url,data,this.headers).pipe();
  }

  //update for leave status
  UpdateStatusLeave(data:any){
    let url = `${this.url}api/utilities/updateLeave`
    return this.http.post(url,data,this.headers).pipe();
  }
}
