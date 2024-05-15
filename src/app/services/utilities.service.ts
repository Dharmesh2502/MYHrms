import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private http: HttpClient) { }

  GrievanceForm(entity: any) {
    let URL = environment.ServerUrl + "api/utilities/grievance_form"
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(entity);
    return this.http.post(URL, body, { headers: headers });
  }

  //client side
  refercandidate(entity: any): Observable<any> {
    let url = environment.ServerUrl + "api/utilities/refer";
    const body = JSON.stringify(entity);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url, body, { headers: headers });
  }

  //client side
  addrefer(entity: any) {
    let url = environment.ServerUrl + "api/utilities/set_refer";
    return this.http.post(url, entity);
  }

  //admin side
  showrefer(entity: any) {
    let url = environment.ServerUrl + "api/utilities/show_references";
    return this.http.post(url, entity);
  }

  //admin side
  delrefer(entity: any): Observable<any> {
    let url = environment.ServerUrl + "api/utilities/del_references";
    const body = JSON.stringify(entity);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url, body, { headers: headers });
  }

  //admin side:
  downloadFile(docFile: any) {
  debugger
    let url = environment.ServerUrl + "api/utilities/GetFile";
    return this.http.post(url, docFile).pipe();
  }

}
