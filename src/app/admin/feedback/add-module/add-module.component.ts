import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { characterwithspacialcharacters } from 'src/app/validations';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {

  ModuleForm:FormGroup;
  addmodformsub:boolean = false;
  showdetails : any[] = []
  insmodule : any[] = []
  selectedUserType: any[] = []
 

  constructor(
    private feedback:FeedbackService, 
    private feedform:FormBuilder
    ) 
  {
     
    this.ModuleForm = this.feedform.group({
      dept_id:['',[Validators.required]],
      dept_name:[''],
      mod_name:['',[Validators.required,Validators.pattern(characterwithspacialcharacters)]],
      Department_Entity :[''],
      Module_Entity : ['']

    });
  }
 
  //this is where Department dropdown dynamically bind
  ngOnInit(): void {

    
     
    let showdata = {
      "flag":"get"
    }
   

    this.feedback.GetDeptddl(showdata).subscribe(
      (showres:any) => 
      {
          
        this.showdetails = showres;
        
      }
    )
  }
  ngAfterViewInit()
  {
    $('#dept').select2({
      }).change((e:any) => this.ModuleForm.controls['dept_id'].setValue(e.target.value));
  }

  get val()
  {
    return this.ModuleForm.controls;
  }
  //this is where module name is inserted in particular department id dropdown
  onAdd()
  {
    this.addmodformsub = true;

    const insertmodule = 
    {
        Department_Entity : 
        {
          dept_id:this.ModuleForm.controls['dept_id'].value
        },
        Module_Entity:
        {
          mod_name:this.ModuleForm.controls['mod_name'].value
        },
        "flag":"save"
    }
  
    if(this.ModuleForm.invalid)
    {
        
      return;
    }
    else
    {
      this.feedback.GetInsertModule(insertmodule).subscribe(
        (moduledata:any) => 
        {
            
          this.insmodule = moduledata;
        
          if(moduledata == "Module Already present.")
          {
            Swal.fire(moduledata,'','warning');
          }
          else
          {
            Swal.fire('Done',moduledata,'success');
          }
          this.ModuleForm.controls['dept_id'].setValue('0')
          this.ModuleForm.reset();
          this.addmodformsub = false;
          $("#dept").select2().trigger('change');
        },
        ErrorMessage => {
          console.log(ErrorMessage)
        }
      )
    }

  
  }



}
