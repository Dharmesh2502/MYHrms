import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyTaskService } from 'src/app/services/daily-task.service';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import Swal from 'sweetalert2';
declare const $:any;
@Component({
  selector: 'app-daily-task-sheet',
  templateUrl: './daily-task-sheet.component.html',
  styleUrls: ['./daily-task-sheet.component.scss']
})
export class DailyTaskSheetComponent implements OnInit {

  TaskSheetForm: FormGroup;
  TaskSheetFormSubmitted: boolean = false;
  emp_data: any = [];
  emp_id:any;
  user_DataSheet: any;
  fileUploaded: any;
  isDataAvail:boolean=false;
  storeData: any;
  imageUrl: any
  worksheet: any;
  selectedFile: any;
  selectedDate:any;
  emp_details: any;
  // show_emp_data : boolean = false;

  constructor(private formBuilder: FormBuilder,
    private taskService: DailyTaskService,
    private encryptDecryptService : EncrdecrService) {
    this.TaskSheetForm = this.formBuilder.group(
      {
        file_path: ['', Validators.required]
      }
    );
  }

  ngOnInit(): void {
    debugger;
    this.getAllTasksheet();

  }
  get r() {
    return this.TaskSheetForm.controls;
  }

  submit() {
     
    this.TaskSheetFormSubmitted = true;
     
    if (this.TaskSheetForm.valid) {
      if (this.selectedFile != undefined) {
        this.uploadTaskSheet(this.selectedFile)
      }
    }
  }

  handleFileInput(e: any) {
    //to select file
     debugger;
    this.selectedFile = e.target.files.item(0);
    // console.log(this.selectedFile);
    let fileSize = this.selectedFile.size;
    let fileType = e.target.files[0].type.toLocaleLowerCase();
    // console.log(fileType);

    if(fileType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType=="application/pdf"){
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Warning...',
        text: 'Only .xlsx and pdf file is allowed !'
        // footer: '<a href>Why do I have this issue?</a>'
      })
    }
  }

  uploadTaskSheet(imageFile: File) {
    let login_emp_data : any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');
    let emp_data = this.encryptDecryptService.getDecr(login_emp_data);
    let data = JSON.parse(emp_data);

     
    const formData: FormData = new FormData();
    // console.log(data.ID);
    formData.append("emp_id",  data.ID),
    formData.append("file_path", imageFile),
    formData.append("emp_name",data.Employee_Name);

    this.taskService.addDailyTaskSheet(formData).subscribe(
      (data: any) => {
        // console.log(data)
        if (data.status == 'success') {
          this.TaskSheetFormSubmitted = false;
          this.r['file_path'].setValue('')
          Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
          this.getAllTasksheet();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
            // footer: '<a href>Why do I have this issue?</a>'
          })
        }
      },
      (err: any) => {
      }
    );
  }

  ngAfterViewInit() {
    $('.clsDatePickerDOB').datepicker({
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


  
  getAllTasksheet(){
    debugger;
    let login_emp_data : any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');
    let emp_data = this.encryptDecryptService.getDecr(login_emp_data);
    let data = JSON.parse(emp_data);
    const datas={
      emp_id:data.ID
    }
    this.emp_id=data.ID;
    this.taskService.get_daily_task_sheet(datas).subscribe(
      (data:any)=>{
        debugger;
        if (data.status == 'success') {
          this.user_DataSheet=data.ArrayOfResponse;
          this.isDataAvail=false;
          $(document).ready(function () {
            $('#tbl_emp_data').DataTable();
          });
        }
        else{
          this.isDataAvail=true;
        }
      },
      (err:any)=>{
        Swal.fire({
          icon: 'error',
          title: '404 Server Error...',
          text: 'Server Error Please Visit After Some Time !'
          // footer: '<a href>Why do I have this issue?</a>'
        })
        this.isDataAvail=true;
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
      emp_id:this.emp_id,
      Selected_Date:this.selectedDate
    }
     this.taskService.get_date_task_sheet(datas).subscribe(
      (data:any)=>{
        debugger;
        if (data.status == 'success') {
          this.user_DataSheet=data.ArrayOfResponse;
          this.isDataAvail=false;
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
}
