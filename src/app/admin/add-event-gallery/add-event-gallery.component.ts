import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event-gallery',
  templateUrl: './add-event-gallery.component.html',
  styleUrls: ['./add-event-gallery.component.scss']
})
export class AddEventGalleryComponent implements OnInit {

  event_gallery:FormGroup;
  selectedFile:any;
  popupmessage:string='';
  imageGalleryData:any;
  isFormSubmiited:boolean=false
  imageFile:any
  isvalidFileType:boolean=true
  isFileRequired:boolean=false
  isvalidFileSize:boolean=true
  constructor(private formbuilder:FormBuilder,private apicall:DashboardService,
    private domSanitizer:DomSanitizer,private encrdecr:EncrdecrService,private spinner: NgxSpinnerService) { 
    this,this.event_gallery = this.formbuilder.group({
      event_image:[''],
      caption:['']
    },
    // {
    //   validators: [this.imageValidation()]
    // }
    )
  }

  ngOnInit(): void {
  
    this.bindImageList();
    
   
  }
  get r(){
    return this.event_gallery.controls
  }
  handleFileInput(file:any){
    this.isFileRequired=false;
    this.imageFile = file
    this.selectedFile = file.target.files[0]; 
    let filetype = this.selectedFile.type.toLocaleLowerCase();
    let fileSize = this.selectedFile.size;
    
    if(filetype == "image/png" || filetype == "image/jpeg" || filetype == "image/jpg") {
      this.isvalidFileType=true;
    } else {
      this.isvalidFileType=false;
      this.event_gallery.controls['event_image'].setValue('');
      // this.event_gallery.controls['event_image'].setErrors({fileType: true});
    }
    if(fileSize>1024000){
      this.isvalidFileSize = false;
      this.event_gallery.controls['event_image'].setValue('');
      this.event_gallery.controls['event_image'].setErrors({fileSize: true});
     }else{
      this.isvalidFileSize = true;
      // this.event_gallery.controls['event_image'].setErrors(null)
     }
    
     
  }
  
  onSubmit(){
    if(this.event_gallery.controls['event_image'].value==''){
      this.isFileRequired = true;
    }
    if(this.isvalidFileSize && this.isvalidFileType && !this.isFileRequired){
       this.uploadImage(this.selectedFile,this.event_gallery.controls['caption'].value) 
  }
    
  }
  uploadImage(imageFile:File,caption:string){
    
    const  formData:FormData = new FormData();
    formData.append("event_image",imageFile)
    formData.append("caption",caption)
    this.spinner.show();
    this.apicall.addEventGallery(formData).subscribe(
      (data:any)=>{
        this.spinner.hide();
        console.log(data)
        if(data.status=='success'){
          this.popupmessage  = data.message;
          this.event_gallery.controls['event_image'].setValue('')
          this.event_gallery.controls['caption'].setValue('')
          this.bindImageList();
          Swal.fire("Done","Image added successfully","success");
        }else{
          Swal.fire("Error",data.message,"error");
        }
      },
      (err:any)=>{
        console.log(err)
      }
    );
    
  }

  deleteEventGallery(id:any){
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          "flag":"get",
          "id":`${id}`
        }
        this.spinner.show();
        this.apicall.deleteEventGallery(data).subscribe(
          (data:any)=>{
            
            if(data.status=='success'){   
              this.bindImageList();
              this.spinner.hide();
              this.popupmessage  = data.message; 
              Swal.fire("Done","Image deleted!!!","success");
            }else{
              Swal.fire("Error",data.message,"error");
            }
          },
          err=>{
            console.log(err)
          }
        );
      }
    })
  }

  bindImageList(){
   
    this.imageGalleryData = undefined;
    let data = {
      "flag":"get"
    }
    
    this.apicall.getEventGallery(data).subscribe(
      (data:any)=>{
        if(data.status=='success'){
          
         this.imageGalleryData = data.ArrayOfResponse;
         debugger
         this.imageGalleryData.map((a:any) =>{
          a.base64string = this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${a.base64string}`)
         });
  
        }
      },
      err=>{
        console.log(err)
      }
    );
   
  }
}
