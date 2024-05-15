import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout.service';
import { IsValidPassword, MustMatch } from 'src/app/validations';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  ForgotLogin:FormGroup;
  isForgotSubmitted:boolean=false;
  isPassword:boolean=true;
  constructor(
    private emp:LogoutService,
    private router:Router,
    private formBuilder : FormBuilder) { 
      this.ForgotLogin=this.formBuilder.group({
        txtPassword:['',[Validators.required,Validators.pattern(IsValidPassword)]],
        txtConfirmPassword:['',[Validators.required,Validators.pattern(IsValidPassword)]]
      },{
        validator:MustMatch("txtPassword","txtConfirmPassword")
      }  
      )
    }

  ngOnInit(): void {
  }
  get r(){
    return this.ForgotLogin.controls;
  }

   onResetPassword(){
    ;
    this.isForgotSubmitted=true;
    if(this.ForgotLogin.invalid){
      return
    }else{
      ;
      const json={
        "Email_id":sessionStorage.getItem("Email"),
        "Password":this.ForgotLogin.controls['txtPassword'].value
      }
      let Data = JSON.stringify(json)
      this.emp.resetPassword(Data).subscribe(
        (res:any)=>{
          if(res.status =="success"){ 
            Swal.fire('Thank you...','Password Updated Successfully..','success');
             this.router.navigate(["/login"]);
            //this.isDisplay=false;
          }else{
            this.router.navigate(["/set-password"]);
          }
        },(err:any)=>{
          console.log(err);
        }
      )
    }
  }

}
