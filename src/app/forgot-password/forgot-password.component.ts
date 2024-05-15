import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoutService } from '../services/logout.service';
import { isEmailValidate,otpDigit } from '../validations'
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotLogin:FormGroup;
  isForgotSubmitted:boolean=false;
  info: any;
  isEmail:boolean=true;
  isOtp:boolean=false;
  isPassword:boolean=false;
  constructor( 
    private emp:LogoutService,
    private router:Router,
    private formBuilder : FormBuilder,
    private spinner:NgxSpinnerService) { 
      this.ForgotLogin=this.formBuilder.group({
        txtEmail:['',[Validators.required,Validators.pattern(isEmailValidate)]],
        txtOtp:[''],
        txtPassword:[''],
        txtConfirmPassword:['']
      })
    }

  get r(){
    return this.ForgotLogin.controls;
  }

  ngOnInit(): void {
  }

  //this method is used to send mail.
  //this method is used to send mail.
  sendOtp(){
    debugger
    const json={
      "email_id":this.ForgotLogin.controls['txtEmail'].value,
    }
    
    this.emp.checkemailexists(json).subscribe(
      (res:any)=>{
        if(res.status == "success"){        
          let Data = JSON.stringify(json)
          this.spinner.show();
          this.emp.SendOtp(Data).subscribe(
            (res:any)=>{
              this.spinner.hide();
              if(res.status =="success"){
                debugger
                if(res.ArrayOfResponse[0].email_id == "OTP limit exists"){
                  // alert("Limit Exists Please try again after 5 minutes.")
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Limit exists please try again after 5 minutes.'
                    // footer: '<a href>Why do I have this issue?</a>'
                  })
                }else{
                  this.isEmail=false;
                  this.isOtp=true;
                  this.ForgotLogin.controls['txtOtp'].setValidators([Validators.required,Validators.pattern(otpDigit)]);
                  Swal.fire('Thank you...','OTP sent to Your email address please check..','success');
                  this.isForgotSubmitted = false;
                  // alert("Otp Send To Your Email Address Please Check..")
                }
              }else{
                // alert("Invalid OTP!!!")
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Invalid OTP!!!.'
                  // footer: '<a href>Why do I have this issue?</a>'
                })
              }
            },(err:any)=>{
              console.log(err);
            }
          )
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email Not Exists'
          })
          
          this.ForgotLogin.reset();
          this.isForgotSubmitted = false;
        }
      }
    )
  }
  // sendOtp(){

  //   const json={
  //     "email_id":this.ForgotLogin.controls['txtEmail'].value,
  //   }

  //   let Data = JSON.stringify(json)
  //   this.spinner.show();
  //   this.emp.SendOtp(Data).subscribe(
  //     (res:any)=>{
  //         this.spinner.hide();
  //       if(res.status =="success"){
            
  //         if(res.ArrayOfResponse[0].email_id == "OTP limit exists"){
  //           // alert("Limit Exists Please try again after 5 minutes.")
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops...',
  //             text: 'Limit exists please try again after 5 minutes.'
  //             // footer: '<a href>Why do I have this issue?</a>'
  //           })
  //         }else{
  //           this.isEmail=false;
  //           this.isOtp=true;
  //           this.ForgotLogin.controls['txtOtp'].setValidators([Validators.required,Validators.pattern(otpDigit)]);
  //           Swal.fire('Thank you...','OTP sent to Your email address please check..','success');
  //           // alert("Otp Send To Your Email Address Please Check..")
  //         }
  //       }else{
  //         // alert("Invalid OTP!!!")
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Invalid OTP!!!.'
  //           // footer: '<a href>Why do I have this issue?</a>'
  //         })
  //       }
  //     },(err:any)=>{
  //       console.log(err);
  //     }
  //   )
  // }

  onResendClick(){
    this.sendOtp();
  }

  //this method is use for get otp from database.
  sendOtpClick(){
      
    this.isForgotSubmitted=true;
    if(this.ForgotLogin.invalid){
      return
    }else{
      this.sendOtp();
     }
  }

  //this method is varify otp in database. if otp is validate then redirect to set-password component.
  SubmitOtpClick(){
    this.isForgotSubmitted=true;
    if(this.ForgotLogin.invalid){
      return
    }else{
        const json={
          "Email_id":this.ForgotLogin.controls['txtEmail'].value,
          "Otp":this.ForgotLogin.controls['txtOtp'].value,
        }
        let Data = JSON.stringify(json)
        this.emp.SubmitOtp(Data).subscribe(
          (res:any)=>{
            if(res.status =="success"){ 
              let Email = this.ForgotLogin.controls['txtEmail'].value;
              sessionStorage.setItem('Email',Email)
               this.router.navigate(["/set-password"]);
              //this.isDisplay=false;
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid OTP!!!.'
                // footer: '<a href>Why do I have this issue?</a>'
              })
            }
          },(err:any)=>{
            console.log(err);
          }
        )
    }
  }


  onBackClick(){
    this.isEmail=true;
    this.isOtp=false;
    this.ForgotLogin.controls['txtOtp'].setValue('');
    this.ForgotLogin.controls['txtOtp'].clearValidators();
    this.ForgotLogin.controls['txtOtp'].updateValueAndValidity();
  }

  //on login link it redirect to login module.
  onLoginbtnClick(){
    this.router.navigate(["/login"]);
  }
}
