import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  GetSubmitStatus(entity : any ) {
    let URL =  environment.ServerUrl+"api/MisFormStatus/chk_formsstatus"
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(entity);
    return this.http.post(URL, body, { headers: headers });
  }

  GetDeptddl(details:any)
  {
     
    
     //here Get department dropdown api call 
     let url = environment.ServerUrl+"api/Training/Getdept"
     return this.http.post(url,details,this.headers).pipe();
  }

  GetInsertModule(details:any)
  {
     
    
     //here Insert Module api call 
     let url = environment.ServerUrl+"api/Module/InsertData"
     return this.http.post(url,details,this.headers).pipe();
  }

  GetInsertDepartment(details:any)
  {
     
    
     //here Insert Department api call 
     let url = environment.ServerUrl+"api/Training/InsertDept" 
     return this.http.post(url,details,this.headers).pipe();
  }

  //Hemangini 
  AddEmpDetails(details:any)
  {
     //here Insert Employee data api call 
     let url=environment.ServerUrl+"api/Employee/SaveData"; 
     return this.http.post(url,details,this.headers).pipe();
  }

  //Author -> Deeksha
  department_ddl(entity: any) {
      
    let url = environment.ServerUrl+"api/Training/Getdept";
    const body = entity
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url, body, { headers: headers });
  }

  module_ddl(entity: any) {
    let url = environment.ServerUrl+"api/Module/Getdata";
    const body = entity;
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url, body, { headers: headers });
  }

  get_date(entity: any){
      
    let url = environment.ServerUrl+"api/AdminView/get_Afeed_data";
    const body = entity
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url, body, { headers: headers });
  }


  //Author:Ravi Vaghela
  //Feedback_send_mail service methods 
  //this service methods is for bind dropdown of employee 
  getEmployee(){
    let url = `${environment.ServerUrl}api/Employee/GetData`
    return this.http.post(url,"").pipe();
  }

  //this methods is for get department data from api 
  getDepartment(data:any){
    let url = `${environment.ServerUrl}api/Mis/MisDeptListviee`
    return this.http.post(url,data).pipe();
  }

  getModuleData(data:any){
    let url = `${environment.ServerUrl}api/Module/Getdata`
    return this.http.post(url,data).pipe();
  }

  //get employeeData/Trainee Data 
  //api/Employee/api_EmpMailDT
  getTraineeData(){
    let url = `${environment.ServerUrl}api/Employee/api_EmpMailDT`
    return this.http.post(url,"").pipe();
  }

  sendMail(data:any){
    let url = `${environment.ServerUrl}api/Email/SendMail`
    return this.http.post(url,data).pipe();
  }

  getLastMailId(data:any){
    let url = `${environment.ServerUrl}api/MisFormStatus/chk_formsstatus`
    return this.http.post(url,data).pipe();
  }

  //Author dinesh
  //save feedbackform response
  saveFeedbackForm(data:any){
    return this.http.post(environment.ServerUrl+"api/Feedback/save",data).pipe();
  }

  //Author dinesh
  //get perticular form
  getTraineeFeedbackForm(data:any){
    return this.http.post(environment.ServerUrl+"api/Profile/getProfile",data).pipe();
  }

  //Author dinesh
  //cheking feedback already filled or not
  checkFeedbackExists(data:any){
    return this.http.post(environment.ServerUrl+"api/FeedbackExists/Chk_log_exist",data).pipe();
  }

}
