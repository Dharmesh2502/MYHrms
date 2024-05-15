import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExportToExcelService } from 'src/app/services/export-to-excel.service';
import { MothlyReportServiceService } from 'src/app/services/mothly-report-service.service';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnInit {
  ExportBtn:Boolean = false;
  Arraydata:any[]=[];
  dataSource:any[]=[];
  ReportForm:FormGroup;
  isVisible:Boolean = false;
  EmpFormSubmitted: boolean = false;
   constructor(private Service:MothlyReportServiceService ,private fb:FormBuilder,private ExportToExcel :ExportToExcelService){
    this.ReportForm=this.fb.group({
      Employee_Name:[''],
     From_Date:['',[Validators.required]],
     To_Date:['',[Validators.required]],
     flag : ['get']
    })
   }
   //show filer data of monthly leave reports
     show()
     {          
       this.Service.postdata(this.ReportForm.value).subscribe(        
         (data:any) =>{            
          if(data.status==="success")
          {
            this.dataSource =  data.ArrayOfResponse; 
          }
          else{
            this.dataSource =  data.ArrayOfResponse; 
            Swal.fire('Data not found','','error')
          }       
          
         },
         (err:any) =>{
          console.log(err);
         }        
         )     
     }
       
     exportExcel() {
      debugger
      if (this.dataSource.length > 0) {
        debugger
        // console.log(parsedDate);
        // console.log(outputDate);

        let fileName = this.ReportForm.controls['Employee_Name'].value+'_'+'Monthly-Leave-Report';
        this.ExportToExcel.GetExportToExcelData(this.dataSource, fileName);
      }
    }

     // get monthly leave report by selected name
     Get_Emp_name(e:any)
     {
       
      this.ReportForm.controls['flag'].setValue('getempname');
      this.show()    
      this.isVisible=true;
      if(this.ReportForm.controls['Employee_Name'].value == ''  && this.isVisible==true)
      { 
        this.isVisible=false;
        this.ReportForm.controls['From_Date'].setValue('');
        this.ReportForm.controls['To_Date'].setValue('');
      }
      if(this.ReportForm.controls['Employee_Name'].value!="null" && this.isVisible==true)
      { 
        this.ReportForm.controls['From_Date'].setValue('');
        this.ReportForm.controls['To_Date'].setValue('');
      }
     }

       // get monthly leave report by selected date
     get_reportBy_date(){
       
      this.EmpFormSubmitted=true;
      if(this.EmpFormSubmitted==true)
      {
        this.ReportForm.controls['flag'].setValue('getempdate');
         //we arrange date in formate yyyy-mm-dd cause sql confuse to convert or give error while converting date formate
        //  let fromdate = this.ReportForm.controls['From_Date'].value.split('/');
        //  let fromdate_set = fromdate[2] + '-' + fromdate[1] + '-' + fromdate[0];
        
        //  let todate = this.ReportForm.controls['To_Date'].value.split('/');
        //  let todate_set = todate[2] + '-' + todate[1] + '-' + todate[0];
         
        const json ={
          Employee_Name:this.ReportForm.controls['Employee_Name'].value,
          From_Date: this.ReportForm.controls['From_Date'].value,
          TO_Date:this.ReportForm.controls['To_Date'].value,
          flag : "getempdate"
        }
         this.Service.postdata(json).subscribe(
        
          (data:any) =>{
          
           if(data.status==="success")
           {
             this.dataSource =  data.ArrayOfResponse; 
             this.ExportBtn=false;
           }
           else{
             Swal.fire('Data not found','','error')
             this.ExportBtn=true;
           }      
          },
          (err:any) =>{
           console.log(err);
          }        
          )           
      
      }
        else{
          return 
        }
     
     
     }

     ngAfterViewInit()
     {
       
      $(".clsDatepickerFromDate").datepicker({
        autoclose: true,
        format:"dd/mm/yyyy",
        todayBtn: 'linked',
        endDate:'+0d',
        startDate: new Date('01/01/1993'),       
        todayHighlight: true,
        orientation: 'auto bottom'
      }).on('change', (e: any) => this.startDateChange(e));
      // .on('change', (e: any) => {
      //   this.ReportForm.controls['From_Date'].setValue(e.target.value)});
      



    //  $('#clsDatepickerFromDate').datepicker({
    //    autoclose: true,
    //    format:'dd/mm/yyyy',
    //    todayBtn: 'linked',
    //    endDate:'0+',
    //    startDate: new Date('01/01/1993'),       
    //    todayHighlight: true,
    //    orientation: 'auto bottom'
    //  }).on('change', (e: any) =>
    //    this.ReportForm.controls['From_Date'].setValue(e.target.value));

        $(".clsDatepickerToDate").datepicker({
          autoclose: true,
          format:"dd/mm/yyyy",
          todayBtn: 'linked',
          endDate:'+30d',
          startDate: new Date('01/01/2000'),  
          todayHighlight: true,
          orientation: 'auto bottom'
        }).on('change', (e: any) => {
          this.ReportForm.controls['To_Date'].setValue(e.target.value)});


      $('#selectid').select2().on('change', (e: any)=> this.Get_Emp_name(this.ReportForm.controls['Employee_Name'].setValue(e.target.value)))
     }
 

     startDateChange(e: any) {
      let val = e.target.value;
      this.ReportForm.controls['From_Date'].setValue(val);
      this.ReportForm.controls['To_Date'].setValue('');
      let nd = val.split('/');
      let m = parseInt(nd[1]) - 1;
      let d = new Date(nd[2], m, nd[0]);
      $('.clsDatepickerToDate').datepicker('setStartDate', d);
      this.ReportForm.controls['To_Date'].enable();
    }

     // by default current month leave data will display
   ngOnInit(): void {
     this.show();
      
     this.Service.getEmployeeName().subscribe(
      (data:any)=>{
        if(data.success="success")
        {
          this.Arraydata =  data.ArrayOfResponse; 
          $(document).ready(function () {
            $('#tablesids').DataTable();
          });
        }    
      },
      (err:any) =>{
        console.log(err);
       } 
     )
     this.ReportForm.controls['To_Date'].disable();
   }
 
}
