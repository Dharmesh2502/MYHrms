import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyTaskService {

  constructor(private http : HttpClient) { }

  url : string = environment.ServerUrl+'api/Reports/add_daily_task_sheet';
  url1 : string = environment.ServerUrl+'api/Reports/get_daily_task_sheet';
  url2 : string = environment.ServerUrl+'api/Reports/get_emp_details';
  url3:string=environment.ServerUrl+'api/Reports/get_date_task_sheet';
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

  addDailyTaskSheet(data : any) : Observable<any>{
    return this.http.post<any>(this.url,data).pipe();
   }

   get_daily_task_sheet(data : any){
    return this.http.post(this.url1,data,this.headers).pipe();
   }

   get_emp_details(){
    return this.http.post(this.url2,{}).pipe();
   }

   get_date_task_sheet(data :any){
    debugger;
    return this.http.post(this.url3,data,{}).pipe();
   }
	
}
