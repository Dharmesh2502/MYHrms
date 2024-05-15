import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpOfMonthService {

  constructor(private http : HttpClient) {
   }

   url_getEmpOfMonth : string = environment.ServerUrl+'api/Dashboard/get_emp_of_month';
   url_addEmpOfMonth : string = environment.ServerUrl+'api/Admin/add_emp_of_month';
   url_removeEmpOfMonth : string = environment.ServerUrl+'api/Admin/remove_emp_of_month';
   
   headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

   getEmpMonth(data:any) : Observable<any[]>{
      
    return this.http.post<any[]>(this.url_getEmpOfMonth,data,this.headers).pipe();
   }

   addEmpMonth(data : any) : Observable<any>{
    return this.http.post<any>(this.url_addEmpOfMonth,data).pipe();
   }

   removeEmpMonth(data : any) : Observable<any>{
    return this.http.post<any>(this.url_removeEmpOfMonth,data,this.headers);
   }


  //  url : string = 'http://localhost:50871/api/Dashboard/get_emp_of_month';
  //  url1 : string = 'http://localhost:50871/api/Admin/add_emp_of_month';

  //  getEmpMonth() : Observable<any[]>{
    
  //   return this.http.post<any[]>(this.url,{}).pipe();
  //  }

  //  addEmpMonth(data : any) : Observable<any>{
  //   return this.http.post<any>(this.url1,data).pipe();
  //  }
}
