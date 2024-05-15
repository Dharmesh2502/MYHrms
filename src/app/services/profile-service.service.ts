import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import {HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  result:any[]=[];
  busy:boolean=true;
  errormessage:string='';
  headers={
    headers: new HttpHeaders({
       'content-type':'application/json'
    })
  } 

  constructor(private http: HttpClient) { }

  updateuserdetails(entity:any):Observable<any>{
     
    const url = environment.ServerUrl+"api/ProfileController/update_Api_User_Records";
    
    // const body = JSON.stringify(entity);
    // console.log(body);
    return this.http.post<any>(url,entity,this.headers).pipe();
  }
  
  getuserdetails(entity:any):Observable<any>{
     
    const url = environment.ServerUrl+"api/ProfileController/get_Api_User_Records";
    const headers = { 'content-type':'application/json'}
    const body = JSON.stringify(entity);
    
    return this.http.post<any>(url,body,{headers:headers}).pipe();
  }

  ap_Uploadimage(entity:any){
     
    const url = environment.ServerUrl+"api/ProfileController/upload_Image_User";
   
    // const body = JSON.stringify(entity);
    // console.log(body);
    return this.http.post(url,entity).pipe();
  }
}
