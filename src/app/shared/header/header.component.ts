import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import { LogoutService } from 'src/app/services/logout.service';
import { SignoutService } from 'src/app/services/signout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userType:string="";
  AdminMenu:boolean=false;
  isPath="/feedbackform";
  isdisplay:boolean=true;

  constructor(
    private router:Router,
    private empsignof:SignoutService,
    private emp:LogoutService,
    private EncrdecrService:EncrdecrService
  ) { }

  ngOnInit(): void {
    let Data:any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');
    if(Data != undefined && Data != null && Data != ""){
        let UserData = JSON.parse(this.EncrdecrService.getDecr(Data));
        this.userType=UserData.role;
    }
    else{ 
      let path = window.location.pathname;
      let feedbackurl = "/feedbackform";
      if(path == feedbackurl){
        this.isdisplay=false;
        this.router.navigate(["/feedbackform"]);
      }else{
        // this.router.navigate(["/login"]);
      }
    } 
  }
  
  GoToDashboard(){
    if(this.userType == '0'){
      //employee Dashboard
      this.router.navigate(["/dashboard"]);
    }
    else{
      //admin Dashboard
      this.AdminMenu=true;
      this.router.navigate(["/admin-dashborad"]);
    }
  }

  onLogOutClick(){
    let Data:any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');
    let UserData = JSON.parse(this.EncrdecrService.getDecr(Data));
    const json={  
     "email_id":UserData.Official_EmaildID
    }
    Swal.fire({
      title:"Log out",
      icon:"question",
      showCancelButton:true,
      confirmButtonText:"Yes",
      cancelButtonText:"No",
      text:`Are you sure you want to Logout`,
    }).then(result =>{
      if(result["isConfirmed"]){
    this.emp.GenerateLog(json).subscribe(
      (log:any)=>{ 
        if(log.status =="success")
        {
          sessionStorage.clear();
          this.router.navigate(["/login"]);
        }
          })
        }
      })
}

  //Author -> Yaksh Maishery
  signouts() {
    debugger
    let data: any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');
    let UserData = JSON.parse(this.EncrdecrService.getDecr(data));

    // Check first time signout
    this.empsignof.SignOutMethod({ Email: UserData.Official_EmaildID, flag: "check" }).subscribe(
      (data: any) => {
        //console.log(data.message)
        if (data.message == 'Signout Successfull!') {

          Swal.fire({
            title: "Sign out",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            text: `Are you sure want to signout`,
          }).then(result => {
            if (result["isConfirmed"]) {
              this.empsignof.SignOutMethod({ Email: UserData.Official_EmaildID }).subscribe(
                (data: any) => {
                  Swal.fire({
                    title: data.status,
                    text: data.message
                  })

                  // this.router.navigate(["/login"]);
                },
                err => {
                  //console.log(err)
                }
              )
            }
            else {
              Swal.fire({
                title: "Cancel",
                icon: "success",
                text: "Cancelled!"
              })
            }
          })
        }
        else{
          Swal.fire({
            title:"success",
            text:"You already signout!"
          })
        }
        // this.router.navigate(["/login"]);
      },
      err => {
        //console.log(err)
      }
    )
  }
}
