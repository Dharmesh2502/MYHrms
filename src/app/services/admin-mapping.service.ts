import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminMappingService {

  constructor(private http:HttpClient) { }
  //binding Reporting person to Select control
  select_MapReporter() : Observable<any[]>
  {
     
    let url = environment.ServerUrl+"api/Admin/select_Report";
  return this.http.post<any>(url,{}).pipe();
  }
  
  //getting mapping for data from master table
  get_mapping_For_data() : Observable<any[]>
  {
    
    let url = environment.ServerUrl+"api/Admin/get_mappingdata";
  return this.http.post<any>(url,{}).pipe();
  }
  //updating mapping reporting person
  upd_mapReport(data:any)
  {
    
    let url = environment.ServerUrl+"api/Admin/updating_mappingdata";
   const  headers={headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return  this.http.post(url,data,headers).pipe();
  }
}
