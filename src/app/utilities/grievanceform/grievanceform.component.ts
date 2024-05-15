import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import Swal from 'sweetalert2';
import { CharacterAndOptionalSpace, phonenumber } from '../../validations';
declare var $: any;
@Component({
  selector: 'app-grievanceform',
  templateUrl: './grievanceform.component.html',
  styleUrls: ['./grievanceform.component.scss'],
})
export class GrievanceformComponent implements OnInit {
  grievanceForm: FormGroup;
  grievanceFormSubmited = false;
  victimForm: any = [];
  isAdmin = false;
  VictimId : number | undefined
  constructor(
    private formBuilder: FormBuilder,
    private Utilities: UtilitiesService,
    private EncrdecrService:EncrdecrService,
    private router : Router
  ) {
    this.grievanceForm = this.formBuilder.group({
      flag: ['', Validators.required], //this is use for my sp flag
      VictimId: ['', Validators.required], //Employee_id who is filling this form we get it from current session
      DateOfIncident: ['', [Validators.required]], //date picker of bootstrap
      TimeOfIncident: ['', [Validators.required]], //time picker of bootstrap
      LocationOfIncident: ['', [Validators.required,Validators.pattern(CharacterAndOptionalSpace)]], //text box
      ComplaintAgainst: [
        '',
        [Validators.required, Validators.pattern(CharacterAndOptionalSpace)],
      ], // textbox
      IncidentDetails: ['', [Validators.required]], // texbox
      WitnessEmployeeName: [
        '',
        [Validators.pattern(CharacterAndOptionalSpace)],
      ], // textbox
      WitnessContactNumber: ['', [Validators.pattern(phonenumber)]], // texbox only number
      WitnessEmailId: [''], // textbox only email regex
      FirstTimeIssues: ['', [Validators.required]], //readio button
      SuggestionsForResolve: [''], //textbox
    });
  }

  ngOnInit(): void {
    let Data: any =  this.EncrdecrService.getDecr(sessionStorage.getItem('Zew8HgA&8z2W&r%+') || '');
    if (Data != undefined && Data != null && Data != '') {  
      //parse data in json formate
      let UserData = JSON.parse(Data);
      //here we get current user id for identify who is filling form
      this.VictimId = UserData.ID
      this.grievanceForm.controls['VictimId'].setValue(this.VictimId);

      //this method only call when in session admin is present
      if (UserData.role === '1') {        
        this.fillGrievanceForm();
      }
    }
  }

  fillGrievanceForm() {
    //here if GrievanceFormId session exist then it means admin come this componet via view button click and we show them prefilled value of perticular form of victim employee
    if (localStorage.getItem('GrievanceFormId') != undefined) {
      const GrievanceFormId = parseInt(this.EncrdecrService.getDecr(
        localStorage.getItem('GrievanceFormId') || '0')
      );

      //sp parameter
      const json = {
        id: GrievanceFormId,
        flag: 'victimform',
      };

      this.Utilities.GrievanceForm(json).subscribe(
        (data: any) => {
          if (data.status === 'SUCCESS') {
            //assing data to variable for further use
            this.victimForm = data.ArrayOfResponse[0];

            //patch value to form
            const {
              DateOfIncident,
              TimeOfIncident,
              LocationOfIncident,
              ComplaintAgainst,
              IncidentDetails,
              WitnessEmployeeName,
              WitnessContactNumber,
              WitnessEmailId,
              FirstTimeIssues,
              SuggestionsForResolve,
            } = this.victimForm;

            this.grievanceForm.patchValue({
              DateOfIncident,
              TimeOfIncident,
              LocationOfIncident,
              ComplaintAgainst,
              IncidentDetails,
              WitnessEmployeeName,
              WitnessContactNumber,
              WitnessEmailId,
              FirstTimeIssues,
              SuggestionsForResolve,
            });

            //here we get date formate yyyy-mm-ddT00:00:00 for showing admin we arrange date in formate dd/mm/yyyy
            let seprateDate = this.victimForm.DateOfIncident.split('T');
            let setDate_arr = seprateDate[0].split('-');
            let setDate =
              setDate_arr[2] + '/' + setDate_arr[1] + '/' + setDate_arr[0];
            this.grievanceForm.controls['DateOfIncident'].setValue(setDate);

            //remove submit button
            this.isAdmin = true;

            //diable hole form casuse admin can not change any value
            this.grievanceForm.disable();
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      this.router.navigateByUrl('/grievancelist');
    }
  }

  ngAfterViewInit() {
    //set value of datepicker text box
    $('#doi')
      .datepicker({
        autoclose: true,
        endDate: '0d+',
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        //startDate: '+0d',
        todayHighlight: true,
        orientation: 'auto bottom',
      })
      .on('change', (e: any) =>
        this.grievanceForm.controls['DateOfIncident'].setValue(e.target.value)
      );

    //setvalue of timepicker text box
    $('#toi').on('change', (e: any) =>
      this.grievanceForm.controls['TimeOfIncident'].setValue(e.target.value)
    );
  }

  onsubmit() {
    this.grievanceFormSubmited = true;
    //sp parameter flag
    this.grievanceForm.controls['flag'].setValue('insert');
    
    console.log(this.grievanceForm.value)
    console.log(this.grievanceForm.invalid)
    if (!this.grievanceForm.invalid) {
      if (this.grievanceForm.controls['DateOfIncident'].value != '') {
        //we arrange date in formate yyyy-mm-dd cause sql confuse to convert or give error while converting date formate
        let d = this.grievanceForm.controls['DateOfIncident'].value.split('/');
        let DateOfIncident = d[2] + '-' + d[1] + '-' + d[0];
        this.grievanceForm.controls['DateOfIncident'].setValue(DateOfIncident);
      }

      //call api and insert data in table grievance form
      this.Utilities.GrievanceForm(this.grievanceForm.value).subscribe(
        (data: any) => {
          if (data.ArrayOfResponse[0].status === 'Inserted Successfully') {
            Swal.fire(
              'Submitted!',
              'Your response has been submitted.',
              'success'
            );
            this.grievanceForm.reset();
            this.grievanceForm.controls['VictimId'].setValue(this.VictimId);
            this.grievanceFormSubmited = false;
          } else {
            Swal.fire('Sorry!', 'Your data not submitted.', 'error');
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  get r() {
    return this.grievanceForm.controls;
  }
}
