import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import{isEmailValidate,IsValidPassword} from "../validations";
import Swal from 'sweetalert2';
import { EncrdecrService } from '../services/encrdecr.service';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm:FormGroup;
  isLoginSubmitted:boolean=false;
  selectedUserType:number = 0;
  constructor(
    private emp:LoginService,
    private router:Router,
    private EncrdecrService:EncrdecrService,
    private formBuilder : FormBuilder
  ) {
    this.LoginForm=this.formBuilder.group({
      UserType:['0',Validators.required],
      txtEmail:['',[Validators.required,Validators.pattern(isEmailValidate)]],
      txtPassword:['',[Validators.required,Validators.pattern(IsValidPassword)]]
    })
   }
   get r(){
    return this.LoginForm.controls;
  }

  ngOnInit(): void {
  }

  //this method is use for dropdown using select 2.
  ngAfterViewInit(){
    $('.ddlUserType').select2({
      minimumResultsForSearch: -1
    }).change(() =>{
      var selectedUserType = $('.ddlUserType').select2("val");   
      this.selectedUserType = selectedUserType
    });

  }

  //this method is call when login button click
  //here we check username and password of employee or admin
  OnLoginClick(){
      
    this.isLoginSubmitted=true;
    if(this.LoginForm.invalid){
      return
    }else{
      const json={
        "role":this.selectedUserType,
        "username":this.LoginForm.controls['txtEmail'].value,
        "password":this.LoginForm.controls['txtPassword'].value
      }
        let data = JSON.stringify(json)
        this.emp.Loginempdata(data).subscribe(
          (res:any)=>{
              
            
            if(res.status == "success"){
              sessionStorage.setItem('Zew8HgA&8z2W&r%+',this.EncrdecrService.setEncr(JSON.stringify(res.ArrayOfResponse[0]))) //for employee information session
              let role = res.ArrayOfResponse[0].role;
              if(role== "0"){
                const emplog={
                  "email_id":res.ArrayOfResponse[0].Official_EmaildID
                }
                this.emp.GenerateLog(emplog).subscribe(
                  (log:any)=>{
                    if(log.status =="success")
                    {
                      // Swal.fire('Thank you...','Welcome To Dashboard','success');
                      this.router.navigate(["/dashboard"]);
                    }else{
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went Wrong'
                        // footer: '<a href>Why do I have this issue?</a>'
                      })
                      // alert("Something Was Wrong")
                    }
                  }
                )    
              }else if(role== "1"){
                  
                const emplog={
                  "email_id":res.ArrayOfResponse[0].Official_EmaildID
                }
                this.emp.GenerateLog(emplog).subscribe(
                  (log:any)=>{
                    if(log.status =="success")
                    {
                      // Swal.fire('Thank you...','welcome to Admin dashboard','success');
                      this.router.navigate(["/admin-dashborad"]);
                    }else{
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went Wrong'
                        // footer: '<a href>Why do I have this issue?</a>'
                      })
                    }
                  }
                )  
              }else{
                //this.router.navigate(["/dashboard"]);
              }
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid username or Password!'
                // footer: '<a href>Why do I have this issue?</a>'
              })
            }
           
          },(err:any)=>{
            console.log(err)
          }
        )
    }
  }

  //on forget link click it redirect to forgot password component.
  onForgotClick(){
    this.router.navigate(["/forgot-password"]);
  }
}
