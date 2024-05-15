import { formatDate } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EncrdecrService } from '../services/encrdecr.service';
import { ProfileServiceService } from '../services/profile-service.service';
import { alphanumeric, fullname, IFSCCode, IsValidAadharNo, IsValidAddress, numerics, pannovalidation } from '../validations';
declare  var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

   User_DetailsFrom:FormGroup  ;
   fromsubmitted:boolean=false;
   departmentData:any;
   selectedFile:any;
   isImageUpdate:boolean=false;
   is_Error:boolean=true;
   isAdmin:boolean=false;
   isEmpPhoto:boolean=false;
   Emp_Image:any;
   Admin_ID:any;
   sampledata:any;
   image: any;
   constructor(
   private frombuilders:FormBuilder,
   private from:FormBuilder,
   private http:ProfileServiceService,
   private route:Router,
   private domSanitizer:DomSanitizer,
   private EncrdecrService:EncrdecrService
  )
  {
    this.User_DetailsFrom=this.frombuilders.group({
        Employee_Name:['',[Validators.required,Validators.pattern(fullname)]],
        DOJ  :[''],
        Employee_Code:['',[Validators.required,Validators.pattern(numerics)]],
        Desigination:['',[Validators.required,Validators.pattern(fullname)]],
        Working_Status:[''],
        Location:['',[Validators.required,Validators.pattern(alphanumeric)]],
        Total_Experience:['',Validators.required],
        DOB:['',],
        Updated_Image:[''],
        Blood_Group :['',[Validators.required]],
        FatherHusband_Name:['',[Validators.required,Validators.pattern(fullname)]],
        Mother_Name:['',[Validators.required,,Validators.pattern(fullname)]],
        Matitual_Status:['', [Validators.required,Validators.pattern(alphanumeric)]],
        Gender : ['', Validators.required],
        Highest_Qualification:['', Validators.required],
        Emerg_ConatactPerson:['',[Validators.required,,Validators.pattern(fullname)]],
        Emerg_ConatactNumber:['',[Validators.required,Validators.pattern(numerics)]],
        Email_id:['',[Validators.required]],
        PanCard_No:['',[Validators.required,Validators.pattern(pannovalidation)]],
        Adhar_No:['',[Validators.required,Validators.pattern(IsValidAadharNo)]],
        Curr_Address:['', [Validators.required,Validators.pattern(IsValidAddress)]],
        Perma_Addresss:['', [Validators.required,Validators.pattern(IsValidAddress)]],
        Official_EmaildID:['',[Validators.required]],
        UAN_Number:['',[Validators.required,Validators.pattern(IsValidAadharNo)]],
        ESIC_Number:['', [Validators.required,Validators.pattern(numerics)]],
        Mediclam_ID:['', [Validators.required,Validators.pattern(numerics)]],
        Role : ['',[Validators.required,Validators.pattern(numerics)]],
        Image : ['',[Validators.required]],
        Department : ['',Validators.required]
    })
  }

  get r(){
    return this.User_DetailsFrom.controls;
  }

  ngOnInit(): void {
    debugger;
    // this.getUserRecords();
    this.getuserprofile();
  }


  getuserprofile(){
    debugger;
    // let data : any= sessionStorage.getItem('employeeInfo');
    // data=JSON.parse(data);
    let data:any=sessionStorage.getItem('Zew8HgA&8z2W&r%+');
    console.log(data);
    let info = JSON.parse(this.EncrdecrService.getDecr(data));
    let id:any=localStorage.getItem('[5W7EhbivyiH#}it');
    if(id!==null){
      this.Admin_ID=this.EncrdecrService.getDecr(id);
    }
    console.log(this.Admin_ID);
    console.log(info.role);
    //Admin View Profile For Update -- Number(info.role)
    if(info!==null && Number(info.role)===0){
      this.sampledata=info;
      console.log(this.sampledata);
      debugger;
      this.sampledata.Image=this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${this.sampledata.Image}`);
        // this.Emp_Image = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        // + toReturnImage.base64string);
    }
    else if(this.Admin_ID!==null){
      debugger;
      this.isAdmin=true;
      this.getUserRecords(this.Admin_ID);
      let data=this.sampledata;
      console.log(this.User_DetailsFrom.value);
    }
      /// Employee Login View Profile
    else{
        debugger;
        Swal.fire('Thank you...', 'You are Admin Please Click ViewPrfile On DashBoard For VieProfile', 'success')
        // Redirect Default Page For Error And UnExpected Sitution
        // this.route.navigate('');
    }   
  }

  ngAfterViewInit() {
    $('.DOB_datepicker').datepicker({
      autoclose: true,
      startDate: new Date('01/01//1993'),
      format: 'dd/mm/yyyy',
      todayBtn: 'linked',
      todayHighlight: true,
      orientation: "auto bottom",
    }).on('change', (e: any) => this.r['DOB'].setValue(e.target.value));

    $('.DOJ_datepicker').datepicker({
      autoclose: true,
      startDate: new Date('01/01//1993'),
      format: 'dd/mm/yyyy',
      todayBtn: 'linked',
      todayHighlight: true,
      orientation: "auto bottom",
    }).on('change', (e: any) => this.r['DOJ'].setValue(e.target.value));

    

    $('#dept').select2({
    }).change((e:any) => this.User_DetailsFrom.controls['Department'].setValue(e.target.value));

  }
  result:any=[];

  updateUserRecords(){
    debugger;
    this.fromsubmitted=true;

    if(this.User_DetailsFrom.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Warning...',
        text: "From Is Invalid ! Fill Peoperly."
      })
      console.log(this.User_DetailsFrom.value)
    }
    else{
      console.log(this.User_DetailsFrom.value)
      this.setUserProfile(this.User_DetailsFrom.value);
      let id=this.User_DetailsFrom.controls['Employee_Code'].value;
      console.log(id);
      this.uploadImage(this.selectedFile,id);
    }
  }

  uploadImage(imageFile:File,caption:any){

    const  formData:FormData = new FormData();
    formData.append("Image",imageFile)
    formData.append("ID",caption)

    this.http.ap_Uploadimage(formData).subscribe(
      (data:any)=>{
        console.log(data)
        if(data.status=='Success'){
          this.User_DetailsFrom.controls['Image'].setValue('');
          Swal.fire("Image Updated Sucessfully",'done',"success");
        }
        else{
          Swal.fire("Image Not Updated",'Error','warning');
        }
        this.getUserRecords(this.Admin_ID);
      },
      err=>{
        console.log(err)
      }
    );

  }


  setUserProfile(userdata:any){
    debugger;
    console.log(userdata);
    let data=this.User_DetailsFrom.value;
    data=JSON.stringify(data);
    console.log(data);
    this.http.updateuserdetails(userdata).subscribe(
      (data:any)=>{
        debugger;
        if(data.status==="Success"){
          this.getUserRecords(this.Admin_ID);
          Swal.fire("Data Updated Sucessfully",'done',"success");
          this.User_DetailsFrom.reset;
        }
        else{
          Swal.fire("Something Went Wrong Please Try Again",'Error','warning');
        }
        
      },
      err=>{
        console.log(err);
      }
    );
  }

  //File Read And Write
  handleFileInput(file:any){
    debugger;
    this.selectedFile = file.target.files[0];
    let filetype = this.selectedFile.type.toLocaleLowerCase();
    let fileSize = this.selectedFile.size;
    if(fileSize>1024000){
      this.User_DetailsFrom.controls['event_image'].setValue('')
      Swal.fire({
        icon: 'error',
        title: 'Warning...',
        text: "Images size should be less than 2 mb."
      })
    }
    else
    {
        if(filetype == "image/png" || filetype == "image/jpeg"){
        var reader = new FileReader();
        }
        else{
          this.User_DetailsFrom.controls['Image'].setValue('')
          alert("please select png  or jpeg type");
    }
  }
}


 getUserRecords(Identity:any){
    const sample={
      id:Identity
    }
    debugger;
    this.http.getuserdetails(sample).subscribe(
      (res:any)=>{
        debugger;
        console.log(res);

        let data=res.ArrayOfResponse.Table[0];
        this.departmentData=res.ArrayOfResponse.Table1;
        console.log(data);

    if(res.status=='Success'){
          // this.popupmessage  = data.message;
          //alert(data.message);
        this.User_DetailsFrom.patchValue(
        {
        Employee_Name : data.Employee_Name,
        // DOJ  : formatDate(data.DOB.split('T'),'yyyy-dd-MM','en'),
        Employee_Code : data.Employee_Code,
        Desigination : data.Desigination,
        Working_Status : data.Working_Status,
        Location : data.Location,
        Total_Experience : data.Total_Experience,
        // DOB  : formatDate(data.DOJ.split('T'),'yyyy-dd-MM','en'),
        Blood_Group : data.Blood_Group,
        FatherHusband_Name : data.FatherHusband_Name,
        Mother_Name : data.Mother_Name,
        Gender : data.Gender,
        Matitual_Status : data.Working_Status,
        Emerg_ConatactPerson : data.Emerg_ConatactPerson,
        Emerg_ConatactNumber : data.Emerg_ConatactNumber,
        Email_id : data.Email_id,
        PanCard_No : data.PanCard_No,
        Adhar_No : data.Adhar_No,
        Curr_Address : data.Curr_Address,
        Perma_Addresss : data.Perma_Addresss,
        Official_EmaildID : data.Official_EmaildID,
        UAN_Number : data.UAN_Number,
        ESIC_Number : data.ESIC_Number,
        Mediclam_ID : data.Mediclam_ID,
        Highest_Qualification : data.Highest_Qualification,
        Role:data.role,
        Department : data.Department
      }
    );
    if(data.DOB!==null && data.DOJ!==null){
      debugger; 
      this.User_DetailsFrom.controls['DOB'].setValue(formatDate(data.DOB.split('T'),'dd/MM/yyyy','en'));
      this.User_DetailsFrom.controls['DOJ'].setValue(formatDate(data.DOJ.split('T'),'dd/MM/yyyy','en'));
    }
    this.r['Role'].disable();

    if(data.Image!==null && data.Image!==""){
      debugger;
      this.Emp_Image=this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${data.Image}`);
      this.isEmpPhoto=true;
      this.isImageUpdate=true;
      this.r['Image'].clearValidators();
      this.r['Image'].updateValueAndValidity();
     }
    else{
      debugger;
      this.isEmpPhoto=false;
     }
    }
    else{
        alert(data.message);
    }
    if(data.Department===null){
      this.User_DetailsFrom.controls['Department'].setValue('');
    }
   },
      err=>{
        debugger;
        console.log(err)
      }
    );
  }
}
