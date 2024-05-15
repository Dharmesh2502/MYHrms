import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminMappingService } from 'src/app/services/admin-mapping.service';
import {EncrdecrService} from 'src/app/services/encrdecr.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  TempReporter:any[]=[];
  mappingReport:FormGroup;
  Reporter:any[]=[];
  EMP:any[]=[];
  result:any;
  id:any;


  constructor(private adminService:AdminMappingService,
     private fb:FormBuilder,
     private router:Router,
     private EncrdecrService:EncrdecrService
     ) {
this.mappingReport=this.fb.group({
  Report_manger:[''],
  ID:['']
});
   }
   getSelectedId(e:any)
   { 
    this.id = e;
   }

   //saving/updating reporting Person
   onSave(ID:any){
     
    this.mappingReport.controls['ID'].setValue(this.id);    
    const json={
      "ID":  this.mappingReport.controls['ID'].value,  
      "Report_manger":this.mappingReport.controls['Report_manger'].value
    }
    this.adminService.upd_mapReport(JSON.stringify(json)).subscribe((data:any)=>{
    this.result= data.Arrayofresponse;
    
    
    if(data.status=="success")
    {  
      this.ngOnInit();
      this.mappingReport.controls['Report_manger'].setValue('');
      //alert('Reporting Manger updated successfully');
      Swal.fire({
        icon: 'success',
        title: 'Reporting Manager updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Failed to update reporting manager',
        showConfirmButton: false,
        timer: 1500
      })
    }
   
}),
(err:any)=>
 {
  console.log(err);
 }
}

  showProfile(e:any){
     
    localStorage.setItem('[5W7EhbivyiH#}it',this.EncrdecrService.setEncr(e));
    this.router.navigate(["/profile"]);
  
  }
  ngAfterViewInit()
  {
   $('#selectid').select2().on('change', (e: any)=> this.onSave(this.mappingReport.controls['Employee_Name'].setValue(e.target.value)))
  }



  ngOnInit(): void {
      
  //calling API to bind reporting manager into select control
    this.adminService.select_MapReporter().subscribe(
      (data:any) =>{
        this.TempReporter =  data.ArrayOfResponse;
      
      $(document).ready(function () {
        $('#tableid').DataTable();
      })
    },
      (err:any) =>{
       console.log(err);
      })

      //Getting Data For Admin Mapping
      this.adminService.get_mapping_For_data().subscribe(
        (data:any) =>{
            
          this.EMP =  data.ArrayOfResponse;
       
        },
        (err:any) =>{
         console.log(err);
        })
    
  }
  BindData(id:any)
  {
    this.Reporter=this.TempReporter.filter(a=> a.ID!=id)
  } 
}
