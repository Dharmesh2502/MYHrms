import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewempjoinService {

  constructor(private http:HttpClient) { }

  Postang_registrtion(){
      
    let url=environment.ServerUrl+"api/Dashboard/new_emp_join";
    return this.http.post(url,"")
  }

  Insert_resignformdata(entity:any){
      
    let url = environment.ServerUrl+"api/utilities/resign_emp";
    const headers = {'content-type' : 'application/json'}
    const body = JSON.stringify(entity);
    return this.http.post(url,body,{headers : headers})
  }

  show_resginemplist(entity:any){
      
    let url = environment.ServerUrl+"api/utilities/resingemplist";
    const headers = {'content-type' : 'application/json'}
    const body = JSON.stringify(entity);
    return this.http.post(url,body,{headers : headers})
  }
}
