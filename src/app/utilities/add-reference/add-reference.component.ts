import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { IsValidMobile, onlyAlpha } from 'src/app/validations';
import Swal from 'sweetalert2';
declare var $: any
@Component({
  selector: 'app-add-reference',
  templateUrl: './add-reference.component.html',
  styleUrls: ['./add-reference.component.scss']
})
export class AddReferenceComponent implements OnInit {
  Referform: FormGroup
  Referformsubmitted: boolean = false
  selectedFile: any
  Id: any
  post: any[] = []
  posts: any[] = []
  constructor(private formbuilder: FormBuilder,
    private refer: UtilitiesService,
    private EncrdecrService: EncrdecrService,
    private route: Router) {
    this.Referform = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern(onlyAlpha)]],
      mob_no: ['', [Validators.required, Validators.pattern(IsValidMobile)]],
      profile_id: ['', Validators.required],
      upload_cv: ['', Validators.required]
    })
  }

  referpositionid: any
  ngOnInit(): void {
    this.referddl()

    if (localStorage.getItem('referpositionid') != undefined) {
      this.referpositionid = this.EncrdecrService.getDecr(localStorage.getItem('referpositionid') || '');
      this.Referform.controls['profile_id'].setValue(this.referpositionid);
      this.Referform.controls['profile_id'].disable();
    }
    else{
      this.route.navigateByUrl('/allvacancy');
    }

  }

  //for uploading files/cv
  //Author -> Deeksha
  handleFileInput(e: any) {
    let fileType = e.target.files[0].type.toLocaleLowerCase();
    if (fileType == "application/pdf" || fileType == "application/msword" || fileType == "application/word" || fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      this.selectedFile = e.target.files.item(0);
    }
    else {
      Swal.fire("", 'Only .pdf, .doc or word files allowed', "error");
      this.Referform.controls['upload_cv'].setValue('')
    }
  }
  get r() {
    return this.Referform.controls;
  }

  ngAfterViewInit() {
    $('#profile').select2().on('change', (e: any) => this.Referform.controls['profile_id'].setValue(e.target.value));
  }

  //binding profile ddl dynamically
  referddl() {
    const json = {
      hi: 'hello'
    }
    this.refer.refercandidate(json).subscribe(
      (define: any) => {
        this.post = define.ArrayOfResponse;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  //submit click for adding the reference into the table
  OnSubmit() {
    this.Referformsubmitted = true
    if (this.Referform.invalid) {
      // Swal.fire('please fill all details','');
      // alert('Something went wrong');
      return;
    } else {

      let Data: any = sessionStorage.getItem('Zew8HgA&8z2W&r%+');
      let data = JSON.parse(this.EncrdecrService.getDecr(Data))
      const formData: FormData = new FormData();
      formData.append("upload_cv", this.selectedFile)
      formData.append("profile_id", this.Referform.controls['profile_id'].value)
      formData.append("emp_id", data.ID)
      formData.append("mob_no", this.Referform.controls['mob_no'].value)
      formData.append("name", this.Referform.controls['name'].value)

      this.refer.addrefer(formData).subscribe(
        (define: any) => {
          this.posts = define;
          if (define.message == 'Reference added successfully') {
            Swal.fire('Done', define.message, 'success');
            this.Referform.reset();
            this.Referformsubmitted = false;
            this.Referform.controls['profile_id'].setValue(this.referpositionid);
            // this.Referform.controls['profile_id'].setValue('')
            $("#profile").select2().trigger('change');
          }
          else {
            Swal.fire(define.message, '', 'warning');
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
}
