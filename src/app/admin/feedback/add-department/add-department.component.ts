import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { characterwithspacialcharacters } from 'src/app/validations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  DepartmentForm:FormGroup;
  adddeptformsub:boolean = false;
  insdepartment: any[] = [];

  constructor(
    private feedback:FeedbackService, 
    private feedform:FormBuilder
  ) 
  { 
    this.DepartmentForm = this.feedform.group({
      dept_name:['',[Validators.required,Validators.pattern(characterwithspacialcharacters)]],
      Department_Entity :[''],
    });
  }

  ngOnInit(): void {
  }

  get val()
  {
    return this.DepartmentForm.controls;
  }

  onAdd()
  {
    this.adddeptformsub = true;
    const insertdept = {
      Department_Entity:
      {
        dept_name:this.DepartmentForm.controls['dept_name'].value
      },
      "flag":"save"
    }
    if(this.DepartmentForm.invalid)
    {
      return;
    }
    else
    {
      this.feedback.GetInsertDepartment(insertdept).subscribe(
        (deptdata:any) => 
        {
          this.insdepartment = deptdata;
          
          if(deptdata == "Department Already Present ")
          {
            Swal.fire(deptdata,'','warning');
          }
          else
          {
            Swal.fire('Done',deptdata,'success');
          }
          this.DepartmentForm.reset();
          this.adddeptformsub = false;
        },
        ErrorMessage => {
          console.log(ErrorMessage)
        }
      )
    }
  }

}
