import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServicesDataService {

  constructor(private EmpData : HttpClient) {

  }

  //get employee contact data 
  GetEmpDetails(){
    debugger
    let data=environment.ServerUrl+'api/Reports/getEmpdata';
  const headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
    return this.EmpData.post(data,headers).pipe()
  }

  EmpContactDetails(details:any){
    let data=environment.ServerUrl+'api/Reports/EmpContactDetails';
  const headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
    }
    return this.EmpData.post(data,details,headers).pipe()
  }


  //get employee on-leave data
  GetEmpLeaveDetails(){
      
    let data=environment.ServerUrl+'api/Reports/EmpLeavedata';
  const headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
    return this.EmpData.post(data,headers).pipe()
  }
}


