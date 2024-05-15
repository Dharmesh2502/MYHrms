import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AttendreportService {

  constructor(private http: HttpClient) { }

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  url:string = environment.ServerUrl

  fetch_attend(data: any) {
    let url = `${this.url}api/AttendReports/getAttends`
    return this.http.post(url,data,this.headers).pipe()
  }
}
