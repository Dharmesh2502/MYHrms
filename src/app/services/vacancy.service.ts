import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(private http: HttpClient) { }

  headers = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  GetRegdata(details:any)
  {
    
    
    let url = environment.ServerUrl+"api/Admin/ins_vacancy_data";
    return this.http.post(url,details,this.headers).pipe();
  }

  GetVacdata(details:any)
  {
    
    
    let url = environment.ServerUrl+"api/Admin/show_vacancy_data";
    return this.http.post(url,details,this.headers).pipe();
  }

  GetInactiveData(details:any)
  {
    
    
    let url = environment.ServerUrl+"api/Admin/inactive_vacancy_data";
    return this.http.post(url,details,this.headers).pipe();
  }

  GetActiveData(details:any)
  {
    
    
    let url = environment.ServerUrl+"api/Admin/active_vacancy_data";
    return this.http.post(url,details,this.headers).pipe();
  }

  GetDeleteData(details:any)
  {
    
    
    let url = environment.ServerUrl+"api/Admin/delete_vacancy_data";
    return this.http.post(url,details,this.headers).pipe();
  }
  
  // GetVacdataForEmp(details:any)
  // {
  //   
  //   //here show vacancy data api call for employee
  //   let url="http://localhost:50871/api/Dashboard/show_emp_vacancy_data";
  //   return this.http.post(url,details,this.headers).pipe();
  // }
}
