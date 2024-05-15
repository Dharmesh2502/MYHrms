import { Component, OnInit } from '@angular/core';
import { ExportToExcelService } from 'src/app/services/export-to-excel.service';
import { ServicesDataService } from 'src/app/services/services-data.service';

@Component({
  selector: 'app-emp-on-leave',
  templateUrl: './emp-on-leave.component.html',
  styleUrls: ['./emp-on-leave.component.scss']
})
export class EmpOnLeaveComponent implements OnInit {
  EmpLeaveDetails: any = [
    // {
    //   Employee_Name:'Adarsh',email:'adarsh@gmail.com',Department:'IT',From_Date:'2022-08-18',
    //   To_Date:'2022-08-18',Reporting_manager_name:'Anurag Sharma'
    // }
  ];
  ExportBtn:boolean=false
  msg:Boolean=false;

  constructor(private emp:ServicesDataService,private ExportToExcel:ExportToExcelService) {
    


   }

  ngOnInit(): void {
    this.emp.GetEmpLeaveDetails().subscribe(
      (data:any)=>{
          
        this.EmpLeaveDetails = data.ArrayOfResponse;
      
        if(data.ArrayOfResponse==null ){
          this.ExportBtn=true
          this.msg=true;
        }
        else{
          this.ExportBtn=false;
        
        }
      },
      
      (ErrorMessage:any)=>{
        console.log(ErrorMessage)
      }
    )
  }

  exportExcel() {
    if (this.EmpLeaveDetails.length > 0) {
      let fileName = 'EmployeeLeaveReport';
      this.ExportToExcel.GetExportToExcelData(this.EmpLeaveDetails, fileName);
    }
  }

}
