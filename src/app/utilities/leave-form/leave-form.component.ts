import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplyLeaveService } from 'src/app/services/apply-leave.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert2'
import { EncrdecrService } from './../../services/encrdecr.service'
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {
  // Show / Hide for Apply/Allow Leaves
  show_apply: boolean = false
  show_allow: boolean = false

  // Apply and Allow Tables
  Apply_Table: any
  Allow_Table: any
  Temp_Allow_Table: any

  // From and To Dates
  FromDateValue: any
  ToDateValue: any

  // Update Status
  empStatus = "pending"

  public LeaveForm: FormGroup

  constructor(private builder: FormBuilder,
    private applyleave: ApplyLeaveService,
    private DatePipe: DatePipe,
    private encrypt: EncrdecrService,
    private spinner:NgxSpinnerService) {
    this.LeaveForm = this.builder.group({
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      desc: ['', Validators.compose([Validators.required, Validators.minLength(150)])]
    })
  }

  ngOnInit(): void {
    // For Employee Leaves
    this.ApplyLeavesShow()

    // For Approval Leaves
    this.AllowLeavesShow()

  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    debugger
    this.r()['to_date'].disable()

    // From Date
    $(".datepicker_from").datepicker({
      autoclose: true,
      startDate: "+7d",
      format: 'dd/mm/yyyy',
      todayBtn: 'linked',
      // todayHighlight: true,
      orientation: "auto bottom",
    }).on("change", (e: any) => {

      if (e.target.value != "") {
        this.r()['from_date'].setValue(e.target.value);
        this.r()['to_date'].enable()
        $(".datepicker_to").datepicker('setStartDate', e.target.value);
        $(".datepicker_to").datepicker('setDate', e.target.value);
        let fromDate = e.target.value.split('/')
        let endDate = new Date(fromDate[2], fromDate[1], fromDate[0])
        endDate.setDate(endDate.getDate() + 14)
        $(".datepicker_to").datepicker('setEndDate', `${endDate.getDate()}/${endDate.getMonth()}/${endDate.getFullYear()}`);
        this.r()['to_date'].setValue("")
      }
      else {
        this.r()['to_date'].setValue("")
        this.r()['to_date'].disable()
      }

    })

    // To Date
    $(".datepicker_to").datepicker({
      autoclose: true,
      format: 'dd/mm/yyyy',
      startDate: "+7d",
      todayBtn: 'linked',
      // todayHighlight: true,
      orientation: "auto bottom",
    }).on("change", (e: any) => {
      debugger
      if (e.target.value != "" || e.target.value != null) {
        this.r()['to_date'].setValue(e.target.value)
        // console.log(this.r()['to_date'].value)
      }
    })

  }

  // Show Apply Leaves
  ApplyLeavesShow() {
    this.applyleave.EmpLeave(this.ApiRequestBody("emp")).subscribe(
      (data: any) => {
        // console.log(data)
        if (data.status == "success") {
          this.show_apply = true
          this.Apply_Table = data.ArrayOfResponse
        }
        else {
          this.show_apply = false
        }
      },
      err => {
        // console.log(err)
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "There is an error!"
        })
      }
    )
  }

  // Show Allow Leaves
  AllowLeavesShow() {
    this.applyleave.SubordinateLeave(this.ApiRequestBody("sub")).subscribe(
      (data: any) => {
        // console.log(data)
        if (data.status == "success") {
          this.show_allow = true
          this.Allow_Table = data.ArrayOfResponse
          this.Temp_Allow_Table = this.Allow_Table
        }
        else {
          this.show_allow = false
        }
      },
      err => {
        // console.log(err)
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "There is an error!"
        })
      }
    )
  }

  // Controller
  r() {
    return this.LeaveForm.controls
  }

  // On Form Submit
  submitForm() {
    debugger
    this.empStatus = "pending"
    if (this.LeaveForm.valid) {

      swal.fire({
        title: "Sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        text: "Are you sure to submit leave application",
      }).then(result => {
        if (result['isConfirmed']) {
          this.spinner.show();
          this.applyleave.ApplyLeave(this.ApiRequestBody()).subscribe(
            (data: any) => {
              // If Submitted Properly
              this.spinner.hide();
              if (data.status == "success") {
                this.ApplyLeavesShow()
                swal.fire("Success", "Successfully Send!", "success")
                this.r()['from_date'].setValue("")
                this.r()['to_date'].setValue("")
                this.r()['desc'].setValue("")
                this.LeaveForm.reset()
              }
              else {
                swal.fire("Failed", "Failed to send!", "error")
              }
            },
            err => { }
          )
          // console.log(this.LeaveForm.value)
        }
        else {
          swal.fire("Cancel", "Cancelled to Send", "success")
        }
      })
    }

    else {
    }
  }

  UpdateStatus(status: string, ID: any, from: string, to: string,email:string) {
    this.empStatus = status
    let sts = ''
    if(this.empStatus == "approved"){
      sts = "Approve"
    }
    else{
      sts = "Not-approve"
    }
    // console.log(this.empStatus, ID, from, to)
    // this.Temp_Allow_Table = this.Allow_Table.filter((e:any) => e.ID == ID)
    swal.fire({
      title: "Sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      text: `Are you sure to ${sts}`,
    }).then(result => {
      if (result["isConfirmed"]) {
        let tempJSON = this.ApiRequestBody("")
        tempJSON.To_Date = to
        tempJSON.From_Date = from
        tempJSON.ID = ID
        tempJSON.Email = email
        this.applyleave.UpdateStatusLeave(tempJSON).subscribe(
          (data: any) => {
            if (data.status == "success") {

              this.Temp_Allow_Table.forEach((element: any) => {
                if (element.ID == ID && element.From_Date == from && element.To_Date == to) {
                  element.Status = this.empStatus
                  if (this.empStatus == "approved") {
                    let elem = document.getElementById(`approve${ID}_${from}_${to}`) as HTMLInputElement
                    elem.disabled = true
                  }
                }
              });
            }
          },
          err => {
            // console.log(err)
          }
        )
      }
    })
  }

  // Call API
  ApiRequestBody(flag: string = "") {
    debugger
    let sessData: any = sessionStorage.getItem('Zew8HgA&8z2W&r%+')
    // let enc = this.encrypt.setEncr(sessData)
    // console.log(enc)
    let decr = this.encrypt.getDecr(sessData)
    // console.log(sessData)
    let UserData = JSON.parse(decr);
    const JSONData = {
      ID: UserData.ID,
      Name: UserData.Employee_Name,
      From_Date: this.r()['from_date'].value,
      To_Date: this.r()['to_date'].value,
      Reason: this.r()['desc'].value,
      Department: UserData.dept_id,
      Email: UserData.Official_EmaildID,
      Report_manger: UserData.Reporting_Manager,
      Status: this.empStatus,
      EmployeeCode: UserData.Employee_Code,
      flag: flag,
    }
    return JSONData
  }
}
