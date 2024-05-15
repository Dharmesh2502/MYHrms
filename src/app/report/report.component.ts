import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DailyTaskService } from '../services/daily-task.service';
import Swal from 'sweetalert2';
import * as saveAs from 'file-saver';
import * as moment from 'moment';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
declare var $: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  userType:any;
  emp_details: any;
  excelData: any;
  EmpForm: FormGroup;
  EmpFormSubmitted: boolean = false;
  showUploadedDate : boolean = false;
  uploaded_date : any;
  hasError: boolean = false;
  showMsg : boolean = false;

  constructor(private dailyTaskService: DailyTaskService,
    private domSanitizer: DomSanitizer,
    private EncrdecrService:EncrdecrService,
    private formBuilder: FormBuilder) {

    this.EmpForm = this.formBuilder.group(
      {
        emp_name: ['', Validators.required]
      }
    )
  }
  ngOnInit(): void {
      
    let Data:any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');
    if(Data != undefined && Data != null && Data != ""){
        let UserData = JSON.parse(this.EncrdecrService.getDecr(Data));
        this.userType=UserData.role;
    }

    this.dailyTaskService.get_emp_details().subscribe(
      (d: any) => {
        if (d.status == 'success') {
           
          this.emp_details = d.ArrayOfResponse;
          // console.log(this.emp_details);
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went report  wrong !!!'
        //   })
        }
      }
    )
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      $("#emp_det").select2({
        dropdownParent: $("#exampleModal")
      });
    });
    $('#emp_det').select2().on('change', (e:any) => this.getUpdloadedDate(e));
  }

  downloadTaskSheet() {
    $('#exampleModal').modal('show');
  }

  downloadExcel() {
    this.EmpFormSubmitted = true;
     
    if (this.EmpForm.valid) {
      // console.log(this.EmpForm.controls['emp_name'].value);
      const json = {
        'emp_id': this.EmpForm.controls['emp_name'].value
      };

      let data = JSON.stringify(json)
      this.dailyTaskService.get_daily_task_sheet(data).subscribe(
        (data: any) => {
           
          // console.log(data);
          // console.log(data.ArrayOfResponse[0].file_path);

          if (data.status == 'success') {

            if (data.ArrayOfResponse[0].file_path != '') {
              this.excelData = data.ArrayOfResponse[0].file_path;
              let date_arr = data.ArrayOfResponse[0].uploaded_date.split(' ');


              let parsedDate = moment(new Date().toLocaleDateString(), "MM/DD/YYYY");
              let outputDate = parsedDate.format("DD-MM-YYYY");
              // let parsedDate = moment(date_arr, "MM/DD/YYYY");
              // let outputDate = parsedDate.format("DD-MM-YYYY");
              // console.log(parsedDate);
              // console.log(outputDate);

              let fileName = data.ArrayOfResponse[0].emp_name + '_' + outputDate;
              this.downloadFile(this.excelData, fileName);
              $('#exampleModal').modal('hide');
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'File Not Found'
                // footer: '<a href>Why do I have this issue?</a>'
              })
              // $('#exampleModal').modal('hide');
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'There is no file found for this employee'
              // footer: '<a href>Why do I have this issue?</a>'
            })
            // $('#exampleModal').modal('hide');
          }
        })
        , (error: any) => {
          Swal.fire('Error', 'Error downloading the file', 'error');
          // console.log('Error downloading the file')
        }
    }

  }

  downloadFile(b64encodedString: string, fileName: string) {
    if (b64encodedString) {
      var blob = this.base64ToBlob(b64encodedString);
      saveAs(blob, fileName + "_TaskSheet.xlsx");
    }
  }

  base64ToBlob(b64Data: any, sliceSize = 512) {
    let byteCharacters = atob(b64Data); //data.file there
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  get r() {
    return this.EmpForm.controls;
  }

  getUpdloadedDate(e:any){
    debugger;
    this.r['emp_name'].setValue(e.target.value);

    if(this.r['emp_name'].value != 0 || this.r['emp_name'].value != null){
      let data = this.emp_details.find((item:any) => item.ID == this.r['emp_name'].value);

        this.showUploadedDate = true;

      if(data.uploaded_date){
          this.uploaded_date = data.uploaded_date;
          this.hasError = false;
        }
        else{
          debugger;
          this.hasError = true;
        }  
    }
}

}
