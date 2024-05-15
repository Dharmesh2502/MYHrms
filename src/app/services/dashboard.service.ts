import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  // Postang_registrtion(){
  //     
  //   let url="http://localhost:50871/api/Dashboard/new_emp_join";
  //   return this.http.post(url,"")
  // }
   //Author Dinesh -- ImportantNotice 
  //insert data into ImportantNotice table 
  ImportantNotice(entity : any ) {
    let URL = environment.ServerUrl+"api/Admin/sp_imp_notice"
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(entity);
    return this.http.post(URL, body, { headers: headers });
  }

   //Author Deeksha -- showevent 
  showevent(entity: any): Observable<any> {
    ;
    let url = environment.ServerUrl+"api/Dashboard/showevent";
    const body = JSON.stringify(entity);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url, body, { headers: headers });
  }

   //Author Deeksha -- addevent 
  //for adding new events (for admin only)
  addevent(entity: any): Observable<any> {
    ;
    let url = environment.ServerUrl+"api/Admin/ins_event";
    const body = JSON.stringify(entity);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url, body, { headers: headers });
  }

  //Author Ravi -->  getEventGallery
 
   getEventGallery(data:any){
    let url = `${environment.ServerUrl}api/Dashboard/get_event_gallery`
    return this.http.post(url,data).pipe();
   }

   addEventGallery(data:FormData){
    let url = `${environment.ServerUrl}api/Admin/add_event_gallery`
    return this.http.post(url,data).pipe();
   }

   deleteEventGallery(data:any){
    let url = `${environment.ServerUrl}api/Admin/delete_event_gallery`
    return this.http.post(url,data).pipe();
   }

  //Author Jignesh panchal -->  vacancydata

  GetVacdataForEmp(details:any)
  {
   
    let url = environment.ServerUrl+"api/Dashboard/show_emp_vacancy_data"
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url,details,{ headers: headers }).pipe();
  }

   //Author Deeksha -- DELETE event 
   delevent(entity:any){
    let url = environment.ServerUrl+"api/Admin/del_event"
    const body = JSON.stringify(entity);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url, body, { headers: headers }).pipe();
  }
}
