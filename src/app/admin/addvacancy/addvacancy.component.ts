import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, FormArray, Validators } from '@angular/forms';
import { VacancyService } from 'src/app/services/vacancy.service';
import { characterwithspacialcharacters,charnumspacedotonly, IFSCCode } from 'src/app/validations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addvacancy',
  templateUrl: './addvacancy.component.html',
  styleUrls: ['./addvacancy.component.scss']
})
export class AddvacancyComponent implements OnInit {

  VacancyForm:FormGroup;
  vacformsub:boolean = false;
  details : any[] = []
  showdetails : any[] = []
  checharr : any = []
  location_custom : any;

  constructor(
    private vacform:FormBuilder,
    private vacdata:VacancyService
  ) 
  { 
    this.VacancyForm = this.vacform.group({
      position_name:['',[Validators.required,Validators.pattern(characterwithspacialcharacters)]],
      location:['',[Validators.required]],
      checkArray : ['',Validators.required],
      experience:['',[Validators.required,Validators.pattern(charnumspacedotonly)]],
      flag:[''],
      id:['']
    });
  }


  ngOnInit(): void {
    this.vacancyDataBind()
  }

  vacancyDataBind()
  {
    let showdata = {
      "flag": "show"
    }

    this.vacdata.GetVacdata(showdata).subscribe(
      (showres: any) => 
      {
          
        this.showdetails = showres.ArrayOfResponse;
        this.showdetails.map((a:any) =>{
          a.location = a.location.replaceAll(',',', ');
         });
      },
      err =>
      {
        console.log(err) 
      }
    )
  }

  onlocationcheck(e:any)
  {
    debugger
    let index = this.checharr.indexOf(e.target.value)
    if(index === -1){
      this.checharr.push(e.target.value)
    }
    else{
      this.checharr.splice(index,1)
      if(this.checharr.length === 0 ){
        this.VacancyForm.controls['location'].setErrors(Validators.required)
      }
      else{
        this.VacancyForm.controls['location'].setErrors(null)
        
      }
    }

  }


  get val()
  {
    return this.VacancyForm.controls;
  }

  onInActive(id: any) {
     
    let inactivedata = {
      "flag": "inactive",
       id: id
    }
    
    this.vacdata.GetInactiveData(inactivedata).subscribe(
      (res: any) => 
      {
        this.details = res;
        Swal.fire('Done','Vacancy inactive successfully','success');
        this.vacancyDataBind();
      },
      err =>
      {
        console.log(err)
      }
    )
  }

// getCustomLocation(e:any)
// {
   
//   this.location_custom = e;
//   if(e.includes(','))
//   {
//     for(let item of e){
//       if(item == ','){
//         this.location_custom =  e.replaceAll(',',', ');
//       }
//     }
//   }
//   return this.location_custom;
// }


  onActive(id: any) {
     
    let activedata = {
      "flag": "active",
       id: id
    }

    this.vacdata.GetActiveData(activedata).subscribe(
      (res: any) => 
      {
        this.details = res;
        Swal.fire('Done','Vacancy activated successfully','success');
        this.vacancyDataBind();
      },
      err =>
      {
        console.log(err)
        
      }
    )
  }
  onSubmit() {
    
    this.vacformsub = true;
    this.VacancyForm.controls['checkArray'].setValue(this.checharr.toString())
    if (this.VacancyForm.invalid) {
        
      return;
    }
    else {
       
      let insertdata = {
        position_name: this.VacancyForm.controls['position_name'].value,
        location: this.VacancyForm.controls['location'].value,
        checkArray:this.VacancyForm.controls['checkArray'].value,
        experience: this.VacancyForm.controls['experience'].value,
        "flag":"insert"
      }

      this.vacdata.GetRegdata(insertdata).subscribe(
        (res: any) => 
        {
          this.details = res;
          Swal.fire('Done','Vacancy added successfully','success');
          this.checharr = []
          this.VacancyForm.reset();
          this.vacancyDataBind();
          this.vacformsub = false;
        },
        err =>
        {
          console.log(err)
        }
      )
    }

  }

  onDelete(id: any) {
    Swal.fire({
      title: 'Are you sure want to delete data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let deletedata = {
          "flag": "delete",
           id: id
        }
        
        this.vacdata.GetDeleteData(deletedata).subscribe(
          (res: any) => 
          {
            this.details = res;
            Swal.fire(
              'Deleted!',
              'Vacancy has been deleted.',
              'success'
            )
            this.vacancyDataBind();
          },
          err =>
          {
            console.log(err)  
          }
        )
       
      }
    })
   
  }

}
