import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MisReportService {

  constructor(private http:HttpClient) { }
  url:string = environment.ServerUrl;

  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

  fetch_depart(data:any){
    let url = `${this.url}api/Mis/MisDdlData`
    return this.http.post(url,data,this.headers).pipe();
  }

  fetch_Reports(data:any){
    let url = `${this.url}api/MisListview/DeptListview`
    return this.http.post(url,data,this.headers).pipe();
  }
}
