import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewempjoinService } from 'src/app/services/newempjoin.service';
import {EncrdecrService} from 'src/app/services/encrdecr.service';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.scss']
})
export class ResignationComponent implements OnInit {
  // Author --> Jay Patel
  Resingationform : FormGroup;
  isresignsubmitted : boolean =false;
  Resignationformsubmited:boolean = false;
  isdisable = false;
  Emp_name:any;
  data:any;
  constructor( private formBuilder : FormBuilder,private EncrdecrService:EncrdecrService,private newempjoinservice:NewempjoinService) {
    this.Resingationform = this.formBuilder.group({
      date_of_resign : ['',Validators.required],
      last_day_work : ['',Validators.required],
      reason_of_leave : ['',Validators.required],
      Employee_Code : [''],
      ID : [''],
      Employee_Name : ['']
    })
   }
  ngOnInit(): void {
    //This method check that If employee give already resigned or not.
    //If Arrayofresponse is null then employee not give any resign.
     let info:any=sessionStorage.getItem('Zew8HgA&8z2W&r%+');
     this.data = JSON.parse(this.EncrdecrService.getDecr(info));
     this.Emp_name = this.data.Employee_Name; 

    let subdata = {
      "flag" :"code",
      "Employee_Code":this.data.Employee_Code
      }
    this.newempjoinservice.show_resginemplist(subdata).subscribe(
      (response:any) =>{
          
        // console.log(response.ArrayOfResponse)
        if(response.ArrayOfResponse !=null)
        {
          this.isresignsubmitted = true
        }
      }
    )
  }

  //This method is use to insert Employee resign data in database.
  onSubmit(){
    this.Resignationformsubmited = true;
    if(this.Resingationform.invalid){
      return;
    }
    else{
      Swal.fire({
        title: 'Are You Sure Want Resign?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, it!'
      }).then((result) => {
        let resign_datge = this.Resingationform.controls['date_of_resign'].value;
      let resignsp = resign_datge.split("/");
      var fresign = resignsp[2] + "-" + resignsp[1] + "-" + resignsp[0];
      this.Resingationform.controls['date_of_resign'].setValue(fresign)
      let lastword = this.Resingationform.controls['last_day_work'].value;
      let lastsp = lastword.split("/");
      var flstdt = lastsp[2] + "-" + lastsp[1] + "-" + lastsp[0];
      this.Resingationform.controls['last_day_work'].setValue(flstdt)
      let Employee_Code= this.data.Employee_Code;
      this.Resingationform.controls['ID'].setValue(this.data.ID);
      this.Resingationform.controls['Employee_Code'].setValue(Employee_Code);
      this.Resingationform.controls['Employee_Name'].setValue(this.data.Employee_Name);
        
     
      debugger
        if (result.isConfirmed) {
      this.newempjoinservice.Insert_resignformdata(this.Resingationform.value).subscribe(
        (response:any) => 
        {
        Swal.fire(
          'Success',
          'Resign Add Successfully',
          'success'
        )
          this.Resingationform.reset()
          this.Resignationformsubmited = false;
          this.isresignsubmitted=true;
        },
        (err:any) => 
        {
          // console.log(err);
        }
      )
      
    }
      })
      
  }
  }

  get r(){
    return this.Resingationform.controls;
  }

  ngAfterViewInit(){
    $("#firstdatapicker").datepicker({
      autoclose:true,
      format : 'dd/mm/yyyy',
      enddate:'0+',
      startDate:'+0d',
      keyboardNavigation:false,
      todayHighlight:true,
      orientation:"auto-bottom",
    }).on('change', (e:any) => this.passstartdate(e));

    this.Resingationform.controls['last_day_work'].disable()

    $("#lastdwdatepicker").datepicker({
      autoclose:true,
       format : 'dd/mm/yyyy',
       enddate:'0+',
      keyboardNavigation:false,
      orientation:"auto-bottom",
      todayHighlight:true
    }).on('change',(e:any) => this.Resingationform.controls["last_day_work"].setValue(e.target.value))
  }

  passstartdate(e:any){
    this.Resingationform.controls['last_day_work'].enable()
      
    let valuestartdate = e.target.value;
    this.Resingationform.controls["date_of_resign"].setValue(valuestartdate);
    var startdate = valuestartdate.split("/");
    let m = parseInt(startdate[1])+2
    let y = parseInt(startdate[2])

    if (m > 12 ){
       y = parseInt(startdate[2])+1
    }
    var fstartdate = startdate[0] + '/' + m + '/' + y;
    $("#lastdwdatepicker").datepicker('setStartDate',fstartdate)
    // console.log(fstartdate);
  }

}
