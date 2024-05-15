import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MothlyReportServiceService {
 Arraydata:any[]=[];
  constructor(private http:HttpClient) { 
  }

  getEmployeeName() : Observable<any[]>
  {
     
    let url = environment.ServerUrl+"api/Admin/get_Leave_emp_name";
  return this.http.post<any>(url,{}).pipe();
  }
  postdata(data:any)
  {
     
    let url = environment.ServerUrl+"api/Admin/Monthly_LeaveReport";
   const  headers={headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return  this.http.post(url,data,headers).pipe();
  }

  // getLeaveReport() : Observable<any[]>
  // {
  //   let url='http://localhost:63416/api/Menu/InsBindMenu'
  // return this.http.post<any>(url,{}).pipe();
  // }
 
  // postdata(data:any)
  // {
  //   let url='http://localhost:50871/api/Admin/Monthly_LeaveReport'
  //  const  headers={headers: new HttpHeaders({'Content-Type': 'application/json'}) };
  //   return  this.http.post(url,data,headers).pipe();
  // }
}
