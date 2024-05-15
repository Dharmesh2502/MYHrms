import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-important-notice',
  templateUrl: './important-notice.component.html',
  styleUrls: ['./important-notice.component.scss'],
})
export class ImportantNoticeComponent implements OnInit {
  NoticeForm: FormGroup;
  NoticeFormSubmited: boolean = false;
  // noticeId : number | undefined; //this variable i used for storing temprory notice Id for updating notice
  noticeArr: any = [];
  isChange = false;
  isData = true;

  constructor(
    private formBuilder: FormBuilder,
    private dashboard: DashboardService
  ) {
    this.NoticeForm = this.formBuilder.group({
      id: [''],
      flag: ['', Validators.required], //'insert' or 'update' or 'delete' or 'getall' or 'lastnotice'
      notice: ['', Validators.required], //this fields data will come from ckediter
      start_date: ['', Validators.required], //date picker of bootstrap
      end_date: ['', Validators.required], //date picker of bootstrap
    });
  }

  ngOnInit(): void {
    this.getAllNotice();
    this.NoticeForm.controls['end_date'].disable();
  }

  ngAfterViewInit() {
    $('#start_date')
      .datepicker({
        autoclose: true,
        enddate: '0+',
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        startDate: '+0d',
        todayHighlight: true,
        orientation: 'auto bottom',
      })
      .on('change', (e: any) => this.startDateChange(e));

    $('#end_date')
      .datepicker({
        autoclose: true,
        enddate: '0+',
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        startDate: '+0d',
        todayHighlight: true,
        orientation: 'auto bottom',
      })
      .on('change', (e: any) =>
        this.NoticeForm.controls['end_date'].setValue(e.target.value)
      );
  }

  startDateChange(e: any) {
    let val = e.target.value;
    this.NoticeForm.controls['start_date'].setValue(val);
    this.NoticeForm.controls['end_date'].setValue('');
    let nd = val.split('/');
    let m = parseInt(nd[1]) - 1;
    let d = new Date(nd[2], m, nd[0]);
    $('#end_date').datepicker('setStartDate', d);
    this.NoticeForm.controls['end_date'].enable();
  }

  trackByData(index: number, noticeArr: any): number {
    return noticeArr.id;
  }

  get r() {
    return this.NoticeForm.controls;
  }

  onAddNotice() {
    this.NoticeFormSubmited = true;
    if (!this.NoticeForm.invalid) {
      //insert data into table important notice
      //make date formate yyyy-mm-dd
      let start_date = this.NoticeForm.controls['start_date'].value.split('/');
      let end_date = this.NoticeForm.controls['end_date'].value.split('/');
      let set_end_date = end_date[2] + '-' + end_date[1] + '-' + end_date[0];
      let set_start_date =
        start_date[2] + '-' + start_date[1] + '-' + start_date[0];
      //make json
      const insertJson = {
        flag: 'insert',
        start_date: set_start_date,
        end_date: set_end_date,
        notice: this.NoticeForm.controls['notice'].value,
      };

      this.dashboard.ImportantNotice(insertJson).subscribe(
        (data: any) => {
          if (data.ArrayOfResponse[0].status === 'Inserted Successfully') {
            Swal.fire('Submitted!','Notice added successfully', 'success');
            this.NoticeForm.reset();
            //refresh data
            this.getAllNotice();
          } else {
            Swal.fire('Error!', 'Notice not added', 'error');
          }
          this.NoticeFormSubmited = false;
        },
        (err: any) => {
          console.log(err);
          Swal.fire('Error!','Notice not added', 'error');
        }
      );
    }
  }

  //update Section
  // onUpdateNotice(){
  //   //update data into table important notice through id we get from edit button or when we fill ckediter we store that id in variable and use it here
  //   this.NoticeForm.controls['flag'].setValue('update');
  //   this.NoticeForm.controls['id'].setValue(this.noticeId);
  //   this.ApiOpration();
  // }

  //delete section
  onDeleteNotice(id: number) {
    //confirm delete
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        //Delete data From table important notice through id we get from list
        this.NoticeForm.controls['flag'].setValue('delete');
        this.NoticeForm.controls['id'].setValue(id);

        this.dashboard.ImportantNotice(this.NoticeForm.value).subscribe(
          (data: any) => {          
            if (data.ArrayOfResponse[0].status === 'Deleted Successfully') {
              //refresh data
              Swal.fire('Deleted!','Notice deleted successfully', 'success');
              this.getAllNotice();
            }
            else{
              Swal.fire('Error!','Notice not deleted', 'error');
            }
          },
          (err: any) => {
            console.log(err);
            Swal.fire('Error!','Notice not deleted', 'error');
          }
        );
      }
    });
  }

  //Edit Section
  // onEditeNotice(id :number){
  //   //getting perticular notice id for update it after
  //   this.noticeId = id;
  //   //fill value in ckEditer
  // }

  //get all notice and showing in list
  getAllNotice() {
    this.NoticeForm.controls['flag'].setValue('getall');
    //store table in array and loop through it and make all notice visible in angular table
    this.dashboard.ImportantNotice(this.NoticeForm.value).subscribe(
      (data: any) => {
        this.noticeArr = data.ArrayOfResponse;
        if (this.noticeArr.length === 0) {
          this.noticeArr = [{ notice: 'No Data Available' }];
          this.isData = false;
        }
        else{
          this.isData = true;
        }
      },
      (err: any) => {
        console.log(err);
        this.noticeArr = [{ notice: 'No Data Available' }];
      }
    );
  }
}

//apply data table
// $(document).ready(function(){
// $('#tbl_dt').DataTable(
//   {
//     pagingType:'full_numbers',
//     pageLength:5,
//     lengthMenu:[5,15,25],
//     processing :true
//   }
// )
// })

// this.dtOptions = {
//   pagingType: 'full_numbers',
//   pageLength: 5,
//   processing: true
// };
