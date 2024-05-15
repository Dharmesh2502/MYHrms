import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-feedback-send-mail',
  templateUrl: './feedback-send-mail.component.html',
  styleUrls: ['./feedback-send-mail.component.scss']
})
export class FeedbackSendMailComponent implements OnInit {

  employeeList :any
  departmentList :any
  moduleList:any
  traineeData:any
  checkedArrayList:any=[]
  allCheckboxSelected:boolean=false;
  showTraineeData = false;
  constructor(private apicall:FeedbackService,private encryptDecrypt:EncrdecrService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
   
    sessionStorage.setItem("lastmailid_status",this.encryptDecrypt.setEncr("0"));
    
    this.bindDDL();
    
    let lastmail_get_status : any = sessionStorage.getItem("lastmailid_status");
    let decrypt_last_mail_id = this.encryptDecrypt.getDecr(lastmail_get_status)
    if(decrypt_last_mail_id ==="0"){
      
      this.getLastMailId();
    }
    
  }
  //this method is for get data for bind dropdown list
  bindDDL(){
    this.apicall.getEmployee().subscribe(
      (data:any)=>{ 
        //data.Table.splice(0, 0, {emp_id:0,emp_name:"Select Employee"});
        this.employeeList = data
        
        $("#ddl_emp").select2().on('change', (e: any) => this.chnage_emp_ddl());
      },(err:any)=>{
        console.log(err)
      }
     );

     //get data for bind department dropdown 
     let data = {
      "flag":"Department"
     }
     
     this.apicall.getDepartment(data).subscribe(
      (responseData:any)=>{
        //responseData.splice(0, 0, {dept_id:0,dept_name:"Select Department"});
        this.departmentList = responseData;
        $("#ddl_dept").select2().on('change', (e: any) => this.getModuleData());
        
        
      },(err:any)=>{
        console.log(err);
      }
     )
   }

   ///this method is for get module data based on selected department 
   //this is department onchange method
   getModuleData(){
    this.traineeData = undefined
    if($('#ddl_dept').val()!=="0" && $('#ddl_emp').val()!=="0"){
      let data : any = {
        ddlDepartment:$('#ddl_dept').val()
      }
     this.apicall.getModuleData(data).subscribe(
        (data:any)=>{
          debugger
          //data.splice(0, 0, {mod_id:0,mod_name:"Select Module"});
          this.moduleList = data;
          $("#ddl_module").select2().on('change', (e: any) => this.getTraineeData());
        }
      )
    }else{
      this.moduleList = undefined
      Swal.fire("","Please select department or select employee first","error");
      
    }
    
   }
   //
   chnage_emp_ddl(){
    
   
    this.traineeData = undefined;
   
    this.moduleList = undefined
   }
   //check all checkboxes 
   selectAllCheckbox(){

    if(this.allCheckboxSelected){
      this.allCheckboxSelected=false;
      $(".checkBoxClass").prop('checked', false);
      this.checkedArrayList = []
    }else{
      this.employeeList.Table.filter((user:any)=> {
        this.checkedArrayList.push(user.emp_id);
      })
      this.allCheckboxSelected=true;
      $(".checkBoxClass").prop('checked', true);
      debugger
    }
    
   }
   //this method is for get trainee data 
   //module dropdown change method
   getTraineeData(){
    if($('#ddl_module').val()!=="0"){
      let data: any[] = []
      let ddl_emp_id = $('#ddl_emp').val()
      let emp_id : number = +ddl_emp_id
      this.employeeList.Table.filter((user:any)=> {
        if(user.emp_id !== emp_id){
          data.push(user)
        }
      })
      this.traineeData = data
    }else{
      this.traineeData = undefined
      Swal.fire("","Please select module","error")
    }
   }
   handleCheckbox(data:any){
    let index = this.checkedArrayList.indexOf(data);
    if(index==-1){
      this.checkedArrayList.push(data);
    }else{
      this.checkedArrayList.splice(index, 1);
    }
   }
   //this method is for send email to selected trainee
   sendMail(){
    debugger
    let listdata:any=[]
    
    this.employeeList.Table.filter((user:any)=> {
      let check =  this.checkedArrayList.includes(user.emp_id);
      if(check){
        debugger
        let proto = window.location.protocol;
        let path = window.location.hostname;
        let port = window.location.port;
        let feedbackUrl = `${proto}//${path}:${port}/feedbackform?qs=`;


      var mail_log_pk = sessionStorage.getItem("mail_log_pk");
      mail_log_pk = this.encryptDecrypt.getDecr(mail_log_pk||'');
      let quaryString = `${$('#ddl_emp').val()},${$('#ddl_dept').val()},${$('#ddl_module').val()},${mail_log_pk}`

      
      let encryptedString = this.encryptDecrypt.setEncr(quaryString);
      
      //${quaryString},${mail_log_pk}
      
      let dataofemp :any={
       emp_id:$('#ddl_emp').val(),
       emp_email:user.email,
       emp_name:user.emp_name,
       querystring:`${feedbackUrl}${encryptedString}`,
       email_log_id:mail_log_pk,
       IsSend:"N",
       TrainerName:$('#ddl_emp option:selected').text(),
        deptEntity:{
        dept_id:$('#ddl_dept').val(),
          dept_name:$('#ddl_dept option:selected').text()
        },
       moduleEntity:{
       mod_id:$('#ddl_module').val(),
       mod_name:$('#ddl_module option:selected').text(),   
     }
     }
  
     let mail_log_pk_number = +mail_log_pk
     let new_mail_log_pk:number = 0
     if(mail_log_pk!==null){
      new_mail_log_pk= +mail_log_pk_number+1;
     }
     let mail_log_id = this.encryptDecrypt.setEncr(`${new_mail_log_pk}`)
     sessionStorage.setItem("mail_log_pk",`${mail_log_id}`);
     listdata.push(dataofemp);
      }
    
    })
    
    if(listdata.length>0){
      this.spinner.show();
      this.apicall.sendMail(listdata).subscribe(
      (data:any)=>{ 
      }
      )
      this.spinner.hide();
      Swal.fire("Done","Mail sent successfully","success");
      this.checkedArrayList = []
      $(".check-all").prop('checked', false);
      $(".checkBoxClass").prop('checked', false);
    }else{
      Swal.fire("","Please select atleast one employee","error")
    }
   }
  
   getLastMailId(){
        let lastmail_get_status = this.encryptDecrypt.setEncr("1");
        sessionStorage.setItem("lastmailid_status",lastmail_get_status);
        let data : any={
          Flag:"lastmailid"
        }
       this.apicall.getLastMailId(data).subscribe(
        (data:any)=>{
          if(data.Table.length>0){
            let last_id:number = +data.Table[0].mail_log_id+1;
            let encrypted_last_id = this.encryptDecrypt.setEncr(`${last_id}`)
            sessionStorage.setItem("mail_log_pk",`${encrypted_last_id}`);
          }  
        }
      );
  }

}
