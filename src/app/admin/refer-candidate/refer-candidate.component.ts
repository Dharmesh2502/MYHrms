import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import Swal from 'sweetalert2';
import { UtilitiesService } from '../../services/utilities.service';
declare var $ : any

@Component({
  selector: 'app-refer-candidate',
  templateUrl: './refer-candidate.component.html',
  styleUrls: ['./refer-candidate.component.scss']
})
export class ReferCandidateComponent implements OnInit {

  Referenceform:FormGroup ;
  ReferenceformSubmitted : boolean = false
  Id:any
  data_id:any
  def:any[]=[]
  noreference:boolean = false
  constructor(
    private formbuilder: FormBuilder,
    private reference : UtilitiesService,
    private encrdecr : EncrdecrService
  ) {
    this.Referenceform = this.formbuilder.group({
    });
   }

  ngOnInit(): void {  
  
    let Data:any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');   
    let data = JSON.parse(this.encrdecr.getDecr(Data))
    this.data_id = data.ID
    this.showreference(data.ID);
   
  }

//this method is for showing refernces in a table to the admin
   //Author -> Deeksha
   showreference(id:any){
    const json ={
      id : id
    }
      this.reference.showrefer(json).subscribe(
        (define: any) => {
          this.def = define.ArrayOfResponse;      
          if(this.def === null || this.def.length === 0){
             $(document).ready(function () {
      $('#tableid').DataTable();
    });
           this.noreference = true                 
          }
        },
        (err: any) => {
          console.log(err);
        }
        
      );
  }
 
   //this method is for allowing the admin to download the file
   downloadclk(filePath:any,filename:any){ 
     const json ={
       filePath : filePath
     }
     this.reference.downloadFile(json).subscribe(
       (define: any) => {
         debugger;
         if(define.message == "File found")
         {
            this.def = define.ArrayOfResponse[0].File;     
            const source = `data:application/pdf;base64,${this.def}`;
            const link = document.createElement("a");
            link.href = source;
            link.download = `${filename}.${define.ArrayOfResponse[0].Type}`
            link.click();
            Swal.fire('Done','File downloaded','success');           
          }
          else
          {
            Swal.fire(define.message,'','warning');
          }
       },
       (err: any) => {
         console.log(err);
       }
     );
   }
 
  //this method is for admin to delete the reference
  deleteclk(e:number){
    Swal.fire({
      title: 'Are you sure you want to delete reference?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      const json = {
        "candidate_id": e
      }
       
       this.reference.delrefer(json).subscribe(
         (define: any) => {
           this.def = define.ArrayOfResponse;
           if(define.message == "Reference deleted successfully")
          {
            Swal.fire('Done',define.message,'success');           
          }
          else
          {
            Swal.fire(define.message,'','warning');
          }
          this.showreference(this.data_id)
         },
         (err: any) => {
           console.log(err);
         }
       );
        }
   })
}
}
  
    
