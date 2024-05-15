import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { characterwithspacesonly, isEmailValidate, IsValidAadharNo, IsValidMobile, IsValidPAN, validpassword } from 'src/app/validations';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  AddEmployeeForm: FormGroup
  EmployeeSubmit: boolean = false
  DeptDetails: any = []
  EmployeeDetails: any


  constructor(private formbuilder: FormBuilder, private data: FeedbackService) {
    this.AddEmployeeForm = this.formbuilder.group({
      dept_id: ['', Validators.required],
      emp_name: ['', [Validators.required, Validators.pattern(characterwithspacesonly)]],
      joining_date: ['', Validators.required],
      emp_email: ['', [Validators.required, Validators.pattern(isEmailValidate)]],
      emp_official_email: ['', [Validators.required, Validators.pattern(isEmailValidate)]],
      emp_contact: ['', [Validators.required, Validators.pattern(IsValidMobile)]],
      emp_pan_no: ['', [Validators.required, Validators.pattern(IsValidPAN)]],
      emp_aadhar_no: ['', [Validators.required, Validators.pattern(IsValidAadharNo)]],
      emp_ESIC_no: ['', Validators.required],
      emp_Mediclaim_ID: ['', Validators.required],
      emp_UAN_number: ['', Validators.required],
      emp_password: ['', [Validators.required, Validators.pattern(validpassword)]],
      //isActive:['Select',Validators.required],
      Flag: ['save']
    })
  }

  ngOnInit() {
    let get_dept = {
      "flag": "get"

    }
    console.log(this.AddEmployeeForm.controls['emp_name'])

    //method to get department data from data table
    this.data.GetDeptddl(get_dept).subscribe(
      (data: any) => {
        //debugger
        this.DeptDetails = data;
        //console.log(this.DeptDetails)
      },
      ErrorMessage => {
        console.log(ErrorMessage)
      }
    )
  }
  ngAfterViewInit() {
    $('#joining_date')
      .datepicker({
        autoclose: true,
        enddate: '0+',
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        // startDate: '',
        todayHighlight: true,
        orientation: 'auto bottom',
      })
      .on('change', (e: any) =>
        this.AddEmployeeForm.controls['joining_date'].setValue(e.target.value)
      );

    $('#dept').select2({
    }).change((e: any) => this.AddEmployeeForm.controls['dept_id'].setValue(e.target.value));
  }

  get form() {
    return this.AddEmployeeForm.controls
  }

  //on Add Employee button click
  OnSubmit() {
    this.EmployeeSubmit = true
    debugger
    console.log(this.AddEmployeeForm.value)
    if (this.AddEmployeeForm.invalid) {
      return
    }
    else {

      let date = this.AddEmployeeForm.controls['joining_date'].value.split('/');
      let setdate = date[2] + '-' + date[1] + '-' + date[0]


      const JSON_data = {
        Employee_Name: this.AddEmployeeForm.controls['emp_name'].value,
        dept_id: this.AddEmployeeForm.controls['dept_id'].value,

        DOJ: setdate,
        //isActive:this.AddEmployeeForm.controls['isActive'].value,
        Email_id: this.AddEmployeeForm.controls['emp_email'].value,
        Official_EmaildID: this.AddEmployeeForm.controls['emp_official_email'].value,
        Emerg_ConatactNumber: this.AddEmployeeForm.controls['emp_contact'].value,
        PanCard_No: this.AddEmployeeForm.controls['emp_pan_no'].value,
        Adhar_No: this.AddEmployeeForm.controls['emp_aadhar_no'].value,
        ESIC_Number: this.AddEmployeeForm.controls['emp_ESIC_no'].value,
        Mediclaim_ID: this.AddEmployeeForm.controls['emp_Mediclaim_ID'].value,
        UAN_Number: this.AddEmployeeForm.controls['emp_UAN_number'].value,
        password: this.AddEmployeeForm.controls['emp_password'].value,
        Flag: this.AddEmployeeForm.controls['Flag'].value

      }

      //  let FormData=JSON.stringify(JSON_data)
      //  console.log(FormData);

      //method to add employee data
      this.data.AddEmpDetails(JSON_data).subscribe(
        (data: any) => {
          debugger
          this.EmployeeDetails = data;
          console.log(this.EmployeeDetails)
          if (data == "Employee Added Successfully") {
            debugger
            Swal.fire('Thank you...', data, 'success');
            // alert("Employeee added Successfully");
          } else if (data == "Employee Not Added") {
            debugger
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data
            })
            // alert("Employee not added....");
          } else if(data == "Employee Already Present"){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data
            })
          }else {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: data
            })
          }
          this.AddEmployeeForm.controls['dept_id'].setValue('0')
          this.AddEmployeeForm.reset();
          this.EmployeeSubmit = false;
          $("#dept").select2().trigger('change');
        },
        ErrorMessage => {
          console.log(ErrorMessage)
        }
      )
    }
  }

}
