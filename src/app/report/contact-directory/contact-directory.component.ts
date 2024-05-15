import { Component, OnInit } from '@angular/core';
import { ExportToExcelService } from 'src/app/services/export-to-excel.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ServicesDataService } from 'src/app/services/services-data.service';
import Swal from 'sweetalert2';
declare var $:any
@Component({
  selector: 'app-contact-directory',
  templateUrl: './contact-directory.component.html',
  styleUrls: ['./contact-directory.component.scss']
})
export class ContactDirectoryComponent implements OnInit {
  employeeList:any;
  EmpContactDetails: any=[
  //   {
  //   Employee_Name:'Chirag',Desigination:'Junior',Emerg_ConatactNumber:'2251141025',
  //   Email_id:'Chirag50@gmail.com',Official_EmaildID:'chirag.s@optimumfintech.co.in',role:0
  // }
];
ExportBtn:boolean=false;
  selectedemp: any;
  empinfo: any;
  constructor(private emp:ServicesDataService,private Emp:FeedbackService,private ExportToExcel:ExportToExcelService) {  
   }

   ngAfterViewInit(){
     $('#empname').select2().change(() =>{
       var selectedUserType = $('#empname').select2("val");   
      this.selectedemp = selectedUserType
      this.empcontactinfo();
     });   
  }

  ngOnInit(): void {
    this.emp.GetEmpDetails().subscribe(
      (data:any)=>{
        this.EmpContactDetails = data.ArrayOfResponse;
      },
      (ErrorMessage:any)=>{
        console.log(ErrorMessage)
      }
    )
  }

  empcontactinfo(){
    debugger
    const json = {
      "id": this.selectedemp
    }
    this.emp.EmpContactDetails(json).subscribe(
      (data:any)=>{
        debugger
        if(data.ArrayOfResponse != null && data.ArrayOfResponse != undefined){
          this.empinfo = data.ArrayOfResponse;
          this.ExportBtn=true
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contact Directory not found'
          })
        }
      },
    )
  }



  exportExcel() {
    if (this.EmpContactDetails.length > 0) {
      let fileName = 'ContactDirectory';
      this.ExportToExcel.GetExportToExcelData(this.empinfo, fileName);
    }
  }

}
