import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpOfMonthService } from 'src/app/services/emp-of-month.service';
import { onlyAlpha, onlyAlphaAndOptionalDot, onlyAlphaWithOptionalDotAndDash } from 'src/app/validations';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-emp-month',
  templateUrl: './emp-month.component.html',
  styleUrls: ['./emp-month.component.scss']
})

export class EmpMonthComponent implements OnInit {
  EmpForm: FormGroup;
  EmpFormSubmitted: boolean = false;
  emp_data: any = [];
  selectedFile: any;
  imageUrl: any;
  show_emp_data: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private emp_service: EmpOfMonthService) {
    this.EmpForm = this.formBuilder.group(
      {
        title: ['',[Validators.required, Validators.pattern(onlyAlphaWithOptionalDotAndDash)]],
        emp_name: ['', [Validators.required, Validators.pattern(onlyAlphaAndOptionalDot)]],
        dept_name: ['', [Validators.required, Validators.pattern(onlyAlphaAndOptionalDot)]],
        eom_date: ['', Validators.required],
        img_path: ['', Validators.required],
        designation: ['', [Validators.required, Validators.pattern(onlyAlphaAndOptionalDot)]]
      }
    );
  }

  ngOnInit(): void {
    let flag = {"flag" : 'all'};
    this.emp_service.getEmpMonth(flag).subscribe(
      (data: any) => {
        this.emp_data = data.ArrayOfResponse;
          this.show_emp_data = true;
        
        $(document).ready(function () {
          $('#tbl_emp_data').DataTable();
        });

        // console.log(this.emp_data);
      },
      (err: any) => {
        // console.log(err);
      }
    );;
  }

  ngAfterViewInit() {
    $('.clsDatePickerDOB').datepicker({
      autoclose: true,
      startDate: '01/01/2022',
      maxDate:'+30d',
      format: 'dd/mm/yyyy',
      todayBtn: 'linked',
      todayHighlight: true,
      orientation: "auto bottom",
    }).on('change', (e: any) => this.r['eom_date'].setValue(e.target.value));
  }

  submit() {
    this.EmpFormSubmitted = true;
    if (this.EmpForm.valid) {
      if (this.selectedFile != undefined) {
        this.uploadImage(this.selectedFile)
      }
    }
    // else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Invalid !!! Please fill all details.'
    //   })
    // }
  }

  uploadImage(imageFile: File) {
    const formData: FormData = new FormData();
    formData.append("img_path", imageFile)
    formData.append("title", this.r['title'].value),
      formData.append("emp_name", this.r['emp_name'].value),
      formData.append("dept_name", this.r['dept_name'].value),
      formData.append("eom_date", this.r['eom_date'].value),
      formData.append("designation", this.r['designation'].value);


    this.emp_service.addEmpMonth(formData).subscribe(
      (data: any) => {
        // console.log(data)
        if (data.status == 'success') {
          this.EmpFormSubmitted = false;

          this.r['img_path'].setValue('')
          this.r['title'].setValue('')
          this.r['emp_name'].setValue('')
          this.r['dept_name'].setValue('')
          this.r['eom_date'].setValue('')
          this.r['designation'].setValue('')

          // alert(data.message);
          Swal.fire('Thank you...', data.message, 'success');

          let flag = {"flag" : 'all'};
          this.emp_service.getEmpMonth(flag).subscribe(
            (data: any) => {
               
              this.emp_data = data.ArrayOfResponse;
              // console.log(this.emp_data)
            },
            (err: any) => {
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message
          })
        }
      },
      (err: any) => {
        // console.log(err)
      }
    );
  }

  get r() {
    return this.EmpForm.controls;
  }

  handleFileInput(e: any) {
    ////////
    //to select file
     
    this.selectedFile = e.target.files.item(0);
    // console.log(this.selectedFile);
    let fileSize = this.selectedFile.size;
    let fileType = e.target.files[0].type.toLocaleLowerCase();

    if (fileSize > 2000000) {
      this.r['img_path'].setValue('')
      Swal.fire({
        icon: 'error',
        title: 'Warning...',
        text: "Images size should be less than 2 mb."
      })
    }

    if (fileType == "image/png" || fileType == "image/jpeg" || fileType == "image/jpg") {
    }
    else {
      this.r['img_path'].setValue('');
      Swal.fire({
        icon: 'error',
        title: 'Warning...',
        text: "Please select jpg/jpeg or png type"
      })
    }
  }

  // previewEOM_Data() {
  //   this.EmpForm.clearValidators();
  //   this.EmpForm.updateValueAndValidity();

  //   $('#exampleModalScrollable').modal('show');
  // }

  removeIt(emp_id: any) {
     
    // console.log(emp_id);
    let emp_data = { "id": emp_id };

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
         
        this.emp_service.removeEmpMonth(JSON.stringify(emp_data)).subscribe(
          (d: any) => {
            Swal.fire(
              'Deleted !',
              'This record has been deleted.',
              'success'
            )

            let flag = {"flag" : 'all'};
            this.emp_service.getEmpMonth(flag).subscribe(
              (data: any) => {
                 
                this.emp_data = data.ArrayOfResponse;
              },
              (err: any) => {
              }
            );
          },
          (err: any) => {
            Swal.fire(
              'Failed !',
              'Operation Failed !!!',
              'error'
            )
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'This record is safe :)',
          'error'
        )
      }
    })
  }
}
