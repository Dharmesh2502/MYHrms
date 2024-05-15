import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyTaskService } from 'src/app/services/daily-task.service';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-daily-task-sheet',
  templateUrl: './admin-daily-task-sheet.component.html',
  styleUrls: ['./admin-daily-task-sheet.component.scss']
})
export class AdminDailyTaskSheetComponent implements OnInit {
  selectedDate: any;
  user_DataSheet: any;
  emp_details: any;
  isEmpSelected:boolean= false;
  isDataAvail:boolean=false;
  Emp_Tasksheet:FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: DailyTaskService,
    private encryptDecryptService : EncrdecrService
  )
  { 
    this.Emp_Tasksheet = this.formBuilder.group(
      {
        Emp_id: ['']
      }
    );
  }

  ngOnInit(): void {

    this.getemprecords();
  }

  ngAfterViewInit() {
    $('.start_date').datepicker({
      autoclose: true,
      startDate: '01/01/2022',
      maxDate:'+30d',
      format: 'yyyy/mm/dd',
      todayBtn: 'linked',
      todayHighlight: true,
      orientation: "auto bottom",
    })
    .on('change', (e: any) => this.selectedDate=e.target.value);
    
  }



  getemprecords(){
    this.taskService.get_emp_details().subscribe(
      (d: any) => {
        if (d.status == 'success') {
           debugger;
           this.emp_details = d.ArrayOfResponse;
          // console.log(this.emp_details);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went report  wrong !!!'
          })
        }
      }
    )
  }
  downloadclk(empname:any,filename:any,fileType:any){
    debugger;
    const source = `data:application/pdf;base64,${filename}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${empname+"_tasksheet"}.${fileType}`
    link.click();
    Swal.fire('Done','File downloaded','success');  
  }

  showTasksheetDate(){
    debugger;
    console.log( this.selectedDate);
    const datas={
      emp_id:this.Emp_Tasksheet.controls['Emp_id'].value,
      Selected_Date:this.selectedDate
    }
     this.taskService.get_date_task_sheet(datas).subscribe(
      (data:any)=>{
        debugger;
        if (data.status == 'success') {
          this.user_DataSheet=data.ArrayOfResponse;
          this.isDataAvail=false;
          this.ngAfterViewInit();
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'No Data Available',
            text: 'DataBase Has No Records For This Date'
            // footer: '<a href>Why do I have this issue?</a>'
          })
          this.user_DataSheet=null;
          this.isDataAvail=true;

        }
      },
      (err:any)=>{
        Swal.fire({
          icon: 'error',
          title: '404 Server Error...',
          text: 'Server Error Please Visit After Some Time !'
        })
        this.user_DataSheet=null;
        this.isDataAvail=true;
      }

     )
  }

  getAllTasksheet(){
    debugger;
    const datas={
      emp_id:this.Emp_Tasksheet.controls['Emp_id'].value,
      Selected_Date : this.selectedDate
    }
    this.taskService.get_daily_task_sheet(datas).subscribe(
      (data:any)=>{
        debugger;
        if (data.status == 'success') {
          this.user_DataSheet=data.ArrayOfResponse;
          this.isEmpSelected=true;
          $(document).ready(function () {
            $('#tbl_emp_data').DataTable();
          });
        }
        else{
          this.isDataAvail=true;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is no file found for this employee'
            // footer: '<a href>Why do I have this issue?</a>'
          })
          this.user_DataSheet=null;
        }
      },
      (err:any)=>{
        Swal.fire({
          icon: 'error',
          title: '404 Server Error...',
          text: 'Server Error Please Visit After Some Time !'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      }
    )
  }

  tasksheetEmployee(){
    debugger;
    console.log(this.Emp_Tasksheet.value);
    console.log( this.selectedDate);
    const json={
      Selected_Date : this.selectedDate,
      Employee_ID :  this.Emp_Tasksheet.controls['Emp_id'].value
    }
    this.isEmpSelected=true;
    this.getAllTasksheet();
  }
}
