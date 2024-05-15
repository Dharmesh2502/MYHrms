import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import Swal from 'sweetalert2';
declare var $:any

@Component({
  selector: 'app-salaryslip',
  templateUrl: './salaryslip.component.html',
  styleUrls: ['./salaryslip.component.scss']
})
export class SalaryslipComponent implements OnInit {
  data: any[] =[];
  id: any;
  def: any;
  filename:any;
  isDisplay:boolean=true;
  DocForm:FormGroup;
  DocDatadownloaded: boolean = false;
  Showbtn:boolean=true
  term:any
  searchtxt:boolean=false;
  tabledata:boolean=false;
  

  constructor(private docserv:DocumentService,
    private encrdecr:EncrdecrService,
    private Document : DocumentService,
    private fb:FormBuilder ) { 
      this.DocForm = this.fb.group({
        From_Date:['',[Validators.required]],
        To_Date:['',[Validators.required]],
      })
    }

    get val()
    {
      return this.DocForm.controls;
    }

    ngAfterViewInit()
    {
      $(".clsDatepickerFromDate").datepicker({
        autoclose: true,
        format:"dd/mm/yyyy",
        todayHighlight: true,
        orientation: 'auto bottom'
      }).on('change',(e:any) => {
        this.DocForm.controls['From_Date'].setValue(e.target.value)
        this.DocForm.controls['To_Date'].enable()
      });
  
      $(".clsDatepickerToDate").datepicker({
        autoclose: true,
        format:"dd/mm/yyyy",
        endDate:'+0d',
        todayHighlight: true,
        orientation: 'auto bottom'
      }).on('change', (e: any) => {
        this.DocForm.controls['To_Date'].setValue(e.target.value)
        this.Showbtn = true;
      });
    }

  ngOnInit(): void {
    this.DocForm.controls['To_Date'].disable();
    this.Showbtn = false;
  
  }

  onShow()
  {
    debugger
    this.DocDatadownloaded = true;
    if(this.DocForm.invalid){
      return;
    }
    else{
      debugger;
      let Data:any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');
      if(Data != undefined && Data != null && Data != ""){
        let UserData = JSON.parse(this.encrdecr.getDecr(Data));
        this.id=UserData.ID;
    }
      let fromDate = this.DocForm.controls['From_Date'].value;
      let toDate = this.DocForm.controls['To_Date'].value;

      let frmdate = fromDate.split("/");
      let tdate = toDate.split("/");
      debugger
      const json = {
        "flag":"show",
        "emp_id":this.id,
        From_Date:`${frmdate[2]}-${frmdate[1]}-${frmdate[0]}`,
        To_Date:`${tdate[2]}-${tdate[1]}-${tdate[0]}`
      }
      debugger
      this.docserv.showEmpDoc(json).subscribe(
        (data:any)=>{
          debugger
          this.data = data.ArrayOfResponse;
          if(data.ArrayOfResponse != null)
          { 
            this.filename=data.ArrayOfResponse[0].fileName;
            this.DocForm.reset();
            this.DocDatadownloaded = false;
            this.DocForm.controls['To_Date'].disable();
            this.Showbtn = false;
            this.searchtxt = true;
            this.tabledata = true;
          }
          else{
            this.DocForm.controls['To_Date'].disable();
            this.DocForm.reset();
            this.DocDatadownloaded = false;
            this.Showbtn = false;
            this.searchtxt = false;
            this.tabledata = true;
          }
          
        },(err:any)=>{
          console.log(err);   
        }
      )
    }

  }

  onDownloadClick(filePath:any){ 
    const json ={
      "filepath" : filePath,
    }
    debugger
    this.Document.downloadFile(json).subscribe(
      (define: any) => {
        debugger;
        if(define.message == "File found")
        {
          debugger
           this.def = define.ArrayOfResponse[0].File;     
           const source = `data:application/pdf;base64,${this.def}`;
           const link = document.createElement("a");
           link.href = source;
           link.download = `${ define.ArrayOfResponse[0].fileName}`
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
}