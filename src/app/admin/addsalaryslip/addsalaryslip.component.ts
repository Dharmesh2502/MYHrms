import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import Swal from 'sweetalert2';

declare var $:any
@Component({
  selector: 'app-addsalaryslip',
  templateUrl: './addsalaryslip.component.html',
  styleUrls: ['./addsalaryslip.component.scss']
})
export class AddsalaryslipComponent implements OnInit {
  DocumentForm: FormGroup;
  DocumentFormSubmitted: boolean = false;
  emp_data: any = [];
  fileUploaded: any;
  storeData: any;
  doc_data:any[]=[];
  selectedFile: any;
  EmployeeList:any [] =[]
  selectedUserType:any;
  selectedDocType:any;
  userinfo: any[]=[];
  uploadbtn:boolean=true;
  // show_emp_data : boolean = false;

  constructor(private formBuilder: FormBuilder,
    private DocService: DocumentService,
    private encryptDecryptService : EncrdecrService,
    private docserv:DocumentService,
    private apicall:FeedbackService) {
    this.DocumentForm = this.formBuilder.group(
      {
        upload_doc: ['', Validators.required],
        employeename:['',Validators.required],
        DocumentType:['',Validators.required]
      }
    );
  }

  ngAfterViewInit(){
 
    $('.ddlUserType').select2({
      minimumResultsForSearch: -1
    }).change(() =>{
      debugger
      var selectedUserType = $('.ddlUserType').select2("val");   
      this.selectedUserType = selectedUserType
      this.DocumentForm.controls['employeename'].setValue( this.selectedUserType);
    });

    $('.ddlDocType').select2({
      minimumResultsForSearch: -1
    }).change(() =>{
      debugger
      var selectedDocType = $('.ddlDocType').select2("val");   
      this.selectedDocType = selectedDocType
      this.DocumentForm.controls['DocumentType'].setValue( this.selectedDocType);
    });

  }

  ngOnInit(): void {
  debugger
 this.apicall.getEmployee().subscribe(
      (data:any)=>{ 
        debugger
        //data.Table.splice(0, 0, {emp_id:0,emp_name:"Select Employee"});
        this.EmployeeList = data.Table
      },(err:any)=>{
        console.log(err)
      }
     );


     this.docserv.binddoctype().subscribe(
      (data:any)=>{
        debugger
        this.doc_data = data.ArrayOfResponse;
      },(err:any)=>{
        console.log(err);   
      }
    )
  }

  get r() {
    return this.DocumentForm.controls;
  }

  submit() {
    debugger
    this.DocumentFormSubmitted = true; 
    if (this.DocumentForm.invalid) 
    {
      return
    }
    else{
      
      this.uploadDocument(this.selectedFile)
    }
  }

  uploadDocument(selectedFile: any) {
    debugger
    this.DocumentFormSubmitted = true
    if (this.DocumentForm.invalid) {
      // this.uploadbtn=true;
      return;
    } else {
      debugger
      let Data: any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');
      debugger
      let data = JSON.parse(this.encryptDecryptService.getDecr(Data))
      const formData: FormData = new FormData();
      let empinfo=this.selectedUserType;
      this.userinfo=empinfo.split("+");
      let empid=this.userinfo[0];
      let empname=this.userinfo[1];
      formData.append("emp_name",empname);
      formData.append("emp_id", empid),
      formData.append("doctype_id", this.selectedDocType),
      formData.append("filepath", selectedFile);
      // formData.append("",);
      this.DocService.addDocument(formData).subscribe(
        (define: any) => {
          if (define.status == 'success') {
            Swal.fire('Done','Document uploded successfully', 'success');
            this.DocumentForm.controls['DocumentType'].setValue('0');
            this.DocumentForm.controls['employeename'].setValue('0');
            this.DocumentForm.reset();
            this.DocumentFormSubmitted = false;
            this.uploadbtn = true

            $("#doc").val(null).trigger('change')
            $("#empname").val(null).trigger('change')

          }
          else {
            Swal.fire('Document Not Added', '', 'warning');
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  handleFileInput(e: any) {
    let fileType = e.target.files[0].type.toLocaleLowerCase();
    if (fileType == "application/pdf" || fileType == "application/msword" || fileType == "application/word" || fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      this.selectedFile = e.target.files.item(0);
      this.uploadbtn = false
    }
    else {
      Swal.fire("", 'Only .pdf, .doc or word files allowed', "error");
      this.DocumentForm.controls['upload_doc'].setValue('')
      this.uploadbtn = true;
    }
  }
}
