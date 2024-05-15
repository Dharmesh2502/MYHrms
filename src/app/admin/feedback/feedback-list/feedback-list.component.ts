import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import { FeedbackService } from 'src/app/services/feedback.service';
declare var $ : any

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  Filledformlist:FormGroup
  Filledformlistsubmitted:boolean = false
  depart_value:any;
  hideheaders:boolean = false
  post : any[] = []
  posts:any[] =[]
  table:any[]= []
  datanotfound : boolean = false

  constructor(private formbuilder: FormBuilder,
             private feedback : FeedbackService,
             private router : Router,
             private encrdecr : EncrdecrService) { 
    this.Filledformlist = this.formbuilder.group({
      Module: ['', Validators.required],
      Department : ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.deptddl()
  }
  
  ngAfterViewInit(){ 
    $('#Department').select2().on('change', (e: any) => this.on_ddl_change(e));
     $('#Module').select2().on('change', (e: any) => this.on_mod_change(e));
  }

   deptddl(){
     const json ={
       hi :'hello'
     }
       this.feedback.department_ddl(json).subscribe(
         (define: any) => {
            
           this.posts = define;
         },
         (err: any) => {
           console.log(err);
         }
       );
   }

   get r(){
    return this.Filledformlist.controls;
  }

  
  on_ddl_change(e : any){
    this.Filledformlist.controls['Department'].setValue(e.target.value);
    this.hideheaders = true
    const json ={
      "ddlDepartment" : e.target.value
    }

    this.depart_value= e.target.value;
    this.feedback.get_date(json).subscribe(
      (define: any) => {
        this.table = define.Table;
        if (this.table == null || this.table == [] ||this.table.length === 0) {
          this.datanotfound = true;
        } else {
          this.datanotfound = false;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.feedback.module_ddl(json).subscribe(
      (define: any) => {
        this.post = define;
      },
      (err: any) => {
        console.log(err);
      }
    );
   this.Filledformlist.controls['Module'].setValue('');
  }

  on_mod_change(e:any){
    this.Filledformlist.controls['Module'].setValue(e.target.value);
    this.hideheaders = true
    if(this.depart_value!==0){
      const json={
        "ddlModuleName":e.target.value,
        "ddlDepartment" : this.depart_value
      }
      this.feedback.get_date(json).subscribe(
        (define: any) => {
          this.table = define.Table;
          if (this.table == null || this.table == [] ||this.table.length === 0) {
            this.datanotfound = true;
          } else {
            this.datanotfound = false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  btn_view(e:any){
    localStorage.setItem('feedback_form_id',this.encrdecr.setEncr(e)) 
    this.router.navigateByUrl('/feedbackform');
  }
}
