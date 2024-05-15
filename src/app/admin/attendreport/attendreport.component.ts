import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttendreportService } from 'src/app/services/attendreport.service';
import { ExportToExcelService } from 'src/app/services/export-to-excel.service';
import Swal from 'sweetalert2';
import 'select2'
declare var $: any;

@Component({
  selector: 'app-attendreport',
  templateUrl: './attendreport.component.html',
  styleUrls: ['./attendreport.component.scss']
})
export class AttendreportComponent implements OnInit {

  public AttendForm: FormGroup
  constructor(private attendservice: AttendreportService,
    private exports: ExportToExcelService,
    private builder: FormBuilder, public datepipe: DatePipe) {
    this.AttendForm = this.builder.group({
      emp: [''],
      from: [''],
      to: ['']
    })
  }

  // Employee Data
  Emp_Table: any
  // Table Data
  Attend_Table: any
  Temp_Attend_Table: any
  // Display Table
  show_table: boolean = false
  // Name to export
  ExportFileName:string = ''

  ngOnInit(): void {
    debugger
    this.r()['from'].disable()
    this.r()['to'].disable()

    // Fetch Data For Employee Dropdown list
    this.attendservice.fetch_attend({ flag: 'emp_name' }).subscribe(
      (data: any) => {
        debugger
        this.Emp_Table = data["ArrayOfResponse"]
        // console.log(this.Emp_Table)
      },
      err => {
        // console.log(err)
        Swal.fire({
          title:"Error!",
          icon:"error",
          text:"There is an Error!"
        })
      }
    )

    // Fetch Data For Employee Table
    this.attendservice.fetch_attend({ flag: '' }).subscribe(
      (data: any) => {
        debugger
        this.Attend_Table = data["ArrayOfResponse"]
      },
      err => {
        // console.log(err)
        Swal.fire({
          title:"Error!",
          icon:"error",
          text:"There is an Error!"
        })
      }
    )
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    // DatePicker
    $(".fromdatepicker").datepicker({
      autoclose:true,
      endDate:new Date()
    }).on("change", (e: any) => {
      this.r()['from'].setValue(e.target.value)
      $(".todatepicker").datepicker('setStartDate', e.target.value)
      this.changeDates()
    })
    $(".todatepicker").datepicker({
      autoclose:true,
      endDate:new Date()
    }).on("change", (e: any) => {
      this.r()['to'].setValue(e.target.value)
      this.changeDates()
    })

    $(".employee").select2({
      minimumResultsForSearch: -1
    }).on("change",(e:any)=>{this.changeEmployee(e.target.value)})
  }

  r() {
    return this.AttendForm.controls
  }

  // Change Employee
  changeEmployee(data: any) {
    debugger
    this.r()['emp'].setValue(data)
    if (data == "--select--") {
      this.Temp_Attend_Table = null
      this.r()['from'].disable()
      this.r()['to'].disable()
      this.r()['from'].setValue("")
      this.r()['to'].setValue("")
    }
    else {
      this.Temp_Attend_Table = this.Attend_Table.filter((items: any) => items.Name == data)
      this.ExportFileName = `attendance report-${this.r()['emp'].value} - ${new Date().toLocaleString()}`
      this.r()['from'].enable()
      this.r()['to'].enable()
      this.r()['from'].setValue("")
      this.r()['to'].setValue("")
    }
  }

  // Export Data
  ExportData() {
    let export_records = this.Temp_Attend_Table.map((item:any) => ({Contact_No:item.Contact_No,Official_ID:item.Official_ID,Sign_In:item.Sign_In,Sign_Out:item.Sign_Out}))
    this.exports.GetExportToExcelData(export_records,this.ExportFileName)
    // console.log(export_records)
  }

  // Date Changes Events
  changeDates() {
    debugger
    let fromDate = this.r()['from'].value
    let toDate = this.r()['to'].value
    let emp_Name = this.r()['emp'].value
    if (fromDate != "") {
      if (toDate != "") {
        this.Temp_Attend_Table = this.Attend_Table.filter((item: any) => {
          return this.datepipe!.transform(item.Sign_In, "MM/dd/yyyy")! <= toDate && 
          this.datepipe!.transform(item.Sign_In, "MM/dd/yyyy")! >= fromDate && 
          item.Name == emp_Name
        })
      }
      else {
        this.Temp_Attend_Table = this.Attend_Table.filter((item: any) => {
          return this.datepipe!.transform(item.Sign_In, "MM/dd/yyyy")! >= fromDate && item.Name == emp_Name
        })
      }
    }
    else{
      this.Temp_Attend_Table = this.Attend_Table.filter((item:any) => item.Name == emp_Name)
      this.r()['to'].setValue("")
    }
  }

}
