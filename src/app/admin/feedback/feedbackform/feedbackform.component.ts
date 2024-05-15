import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-feedbackform',
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.scss'],
})
export class FeedbackformComponent implements OnInit {
  feedbackForm: FormGroup;
  feedbackFormSubmited = false;
  isAdmin = false;
  ddlEmployee: any = [];
  ddlDepartment: any = [];
  ddlModule: any = [];
  city: any = [];
  feedbackformArr: any = [];
  feedbackformAnswerArr: any = [];
  quaryStringArr: any = [];
  isSuccessfullSubmit = false;
  isAccess = true;

  constructor(
    private encrdecr: EncrdecrService,
    private feedback: FeedbackService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.feedbackForm = this.formBuilder.group({
      ddlDepartment: ['', Validators.required], //dropdown this will bydefault checked we get it's value from quary string
      ddlModuleName: ['', Validators.required], //dropdown this will bydefault checked we get it's value from quary string
      ddlTrainer: ['', [Validators.required]], //dropdown of trainer name who is facilate trainnig this will bydefault checked we get it's value from quary string
      StartDate: ['', [Validators.required]], //date picker
      EndDate: ['', [Validators.required]], //date picker which is enable after on start date select
      State: ['', Validators.required], //this will also from drop down but we bind here
      City: ['', Validators.required], //based on state
      ModeOfTraining: ['', Validators.required], // dropdown online ofline hardcore
      EnjoyMostAboutTraining1: ['', Validators.required], //text box
      EnjoyMostAboutTraining2: ['', Validators.required], //text box
      EnjoyMostAboutTraining3: ['', Validators.required], //text box
      ImproveTraining: ['', Validators.required], //text area

      //------question rating is in dropdown 0,1,2,3,4
      quetion11: ['', Validators.required],
      quetion12: ['', Validators.required],
      quetion13: ['', Validators.required],
      quetion14: ['', Validators.required],
      quetion15: ['', Validators.required],
      quetion16: ['', Validators.required],
      quetion17: ['', Validators.required],
      quetion18: ['', Validators.required],
      quetion19: ['', Validators.required],
      quetion20: ['', Validators.required],

      SkillsLearn: ['', Validators.required], //text area
      Comments: ['', Validators.required], //text area
      Answers: [''], //this is which we give to api as concate string of question rating
      mail_log_id: ['', Validators.required], //we wiil get this from quary string

      btnSub: [''],
    });
  }

  ngOnInit(): void {
    debugger
    try {
      let quaryString = this.encrdecr.getDecr(
        this.route.snapshot.queryParamMap.get('qs') || ''
      );
      debugger
      // let quaryString = this.route.snapshot.queryParamMap.get('qs');
      if (quaryString != null && quaryString != '' && quaryString != undefined) {
        this.getQuaryStringAndSetvalue();
      } else if (localStorage.getItem('feedback_form_id') != undefined) {
        this.fillForm();
      } else {
        //showing access denied div
        this.isAccess = false;
      }
    }
    catch (ex) {
      debugger
      console.log(ex);
      this.isAccess = false;
    }
  }

  getQuaryStringAndSetvalue() {
    //let quaryString = this.route.snapshot.queryParamMap.get('qs');
    let quaryString = this.encrdecr.getDecr(
      this.route.snapshot.queryParamMap.get('qs') || ''
    );
    debugger
    if (quaryString != null && quaryString != '' && quaryString != undefined) {
      this.quaryStringArr = quaryString?.split(',');

      //cheking if this feedback already filled then we show thank you template
      //calling api which will check that user filled this this or not
      const json = {
        email_log_id: parseInt(this.quaryStringArr[3]),
      };

      this.feedback.checkFeedbackExists(json).subscribe(
        (data: any) => {
          if (data.length !== 0) {
            this.isSuccessfullSubmit = true;
          } else {
            //first bind ddl
            this.ddlbind();
            this.ddlDepartmentChang(parseInt(this.quaryStringArr[1]));

            //set value of trainer name and module name and department name through quary string
            this.feedbackForm.controls['ddlTrainer'].setValue(
              this.quaryStringArr[0]
            );
            this.feedbackForm.controls['ddlDepartment'].setValue(
              this.quaryStringArr[1]
            );
            this.feedbackForm.controls['ddlModuleName'].setValue(
              this.quaryStringArr[2]
            );
            this.feedbackForm.controls['mail_log_id'].setValue(
              this.quaryStringArr[3]
            );
            this.feedbackForm.controls['ddlTrainer'].disable();
            this.feedbackForm.controls['ddlDepartment'].disable();
            this.feedbackForm.controls['ddlModuleName'].disable();
            this.feedbackForm.controls['EndDate'].disable();
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  fillForm() {
    //PREFIILL FORM FOR SHOWING TO ADMIN
    //here if feedback form id from if it session exist then it means admin come this componet via view button click and we show them prefilled value of perticular form of victim employee
    if (localStorage.getItem('feedback_form_id') != undefined) {
      const Trainee_Id = parseInt(
        this.encrdecr.getDecr(localStorage.getItem('feedback_form_id') || '0')
      );

      //sp parameter
      const json = {
        Trainee_Id: Trainee_Id, //this we can get from session
      };
      this.feedback.getTraineeFeedbackForm(json).subscribe(
        (data: any) => {
          //assing data to variable for further use
          this.feedbackformArr = data.Table; //main data of form
          this.feedbackformAnswerArr = data.Table1; //second table of answer rating

          //bind department and trainer department
          this.ddlbind();

          //bind module dropdown
          this.ddlDepartmentChang(parseInt(this.feedbackformArr[0].dept_id));

          //bind city drop down
          this.onStateChange(this.feedbackformArr[0].state);

          //here we get enjoyment of trainne in 3 comma seprated value so here we splite into it array and assign it to perticular text box
          let enjoyment = this.feedbackformArr[0].trainee_enjoyment.split(',');

          //here we get date formate yyyy-mm-ddT00:00:00 for showing admin we arrange date in formate dd/mm/yyyy
          let startdatewithtime = this.feedbackformArr[0].start_date.split('T');
          let startdate = startdatewithtime[0].split('-');
          let show_startdate =
            startdate[2] + '/' + startdate[1] + '/' + startdate[0];

          let enddatewithtime = this.feedbackformArr[0].end_date.split('T');
          let enddate = enddatewithtime[0].split('-');
          let show_enddate = enddate[2] + '/' + enddate[1] + '/' + enddate[0];

          //remove submit button
          this.isAdmin = true;

          //patching value
          this.feedbackForm.patchValue({
            ddlDepartment: this.feedbackformArr[0].dept_id,
            ddlModuleName: this.feedbackformArr[0].mod_id,
            ddlTrainer: this.feedbackformArr[0].emp_id,
            StartDate: show_startdate,
            EndDate: show_enddate,
            State: this.feedbackformArr[0].state,
            City: this.feedbackformArr[0].city,
            ModeOfTraining:
              this.feedbackformArr[0].mode_of_training_is_online_ofline,
            EnjoyMostAboutTraining1: enjoyment[0],
            EnjoyMostAboutTraining2: enjoyment[1],
            EnjoyMostAboutTraining3: enjoyment[2],
            ImproveTraining: this.feedbackformArr[0].need_improve,
            SkillsLearn: this.feedbackformArr[0].trainee_learn,
            Comments: this.feedbackformArr[0].trainee_comments,
            quetion11: this.feedbackformAnswerArr[0].rating,
            quetion12: this.feedbackformAnswerArr[1].rating,
            quetion13: this.feedbackformAnswerArr[2].rating,
            quetion14: this.feedbackformAnswerArr[3].rating,
            quetion15: this.feedbackformAnswerArr[4].rating,
            quetion16: this.feedbackformAnswerArr[5].rating,
            quetion17: this.feedbackformAnswerArr[6].rating,
            quetion18: this.feedbackformAnswerArr[7].rating,
            quetion19: this.feedbackformAnswerArr[8].rating,
            quetion20: this.feedbackformAnswerArr[9].rating,
          });

          //diable hole form casuse admin can not change any value
          this.feedbackForm.disable();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  //dropdown bind for city based on state
  onStateChange(e?: any) {
    this.feedbackForm.controls['City'].setValue('');
    if (e.target != undefined) {
      if (e.target.value === 'Gujarat') {
        this.city = [{ value: 'Ahmedabad' }];
      } else {
        this.city = [{ value: 'Pune' }, { value: 'Mumbai' }];
      }
    } else {
      if (e === 'Gujarat') {
        this.city = [{ value: 'Ahmedabad' }];
      } else {
        this.city = [{ value: 'Pune' }, { value: 'Mumbai' }];
      }
    }
  }

  //ondepartment change we bind module dropdown
  ddlDepartmentChang(e: any) {
    let modulejson;
    //paramert for get department data when no admin means on this page
    if (e.target != undefined) {
      modulejson = {
        ddlDepartment: e.target.value,
      };
    } else {
      //get module data when admin is on this page who is here for view form
      modulejson = {
        ddlDepartment: parseInt(e),
      };
    }

    //bind department data
    this.feedback.getModuleData(modulejson).subscribe(
      (data: any) => {
        this.ddlModule = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  //on inite we bind 5 drop down
  ddlbind() {
    //bind trainer ddl
    this.feedback.getEmployee().subscribe(
      (data: any) => {
        this.ddlEmployee = data.Table;
      },
      (err: any) => {
        console.log(err);
      }
    );

    //paramert for get department data
    const json = {
      flag: 'Department',
    };
    //bind department data
    this.feedback.getDepartment(json).subscribe(
      (data: any) => {
        this.ddlDepartment = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  ngAfterViewInit() {
    //seting date picker
    $('#StartDate')
      .datepicker({
        autoclose: true,
        endDate: '0d+',
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        // startDate: '+0d',
        todayHighlight: true,
        orientation: 'auto bottom',
      })
      .on('change', (e: any) => this.startDateChange(e));

    $('#EndDate')
      .datepicker({
        autoclose: true,
        endDate: '0d+',
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        startDate: '+0d',
        todayHighlight: true,
        orientation: 'auto bottom',
      })
      .on('change', (e: any) =>
        this.feedbackForm.controls['EndDate'].setValue(e.target.value)
      );
  }

  startDateChange(e: any) {
    let val = e.target.value;
    this.feedbackForm.controls['StartDate'].setValue(val);
    this.feedbackForm.controls['EndDate'].setValue('');
    let nd = val.split('/');
    let d = new Date(nd[2], nd[1] - 1, nd[0]);
    $('#EndDate').datepicker('setStartDate', d);
    this.feedbackForm.controls['EndDate'].enable();
  }

  onsubmit() {
    this.feedbackFormSubmited = true;
    if (!this.feedbackForm.invalid) {
      this.setValueAcordingApiRequirnment();
      this.feedbackForm.enable();
      this.feedback.saveFeedbackForm(this.feedbackForm.value).subscribe(
        (data: any) => {
          if (data >= 1) {
            this.feedbackForm.reset();
            this.feedbackForm.disable();
            Swal.fire(
              'Submitted!',
              'Your response has been submitted successfully',
              'success'
            );
            this.isAdmin = true;
            this.isSuccessfullSubmit = true;
          } else {
            Swal.fire('Error!', 'Your response has been not submitted', 'error');
            this.feedbackForm.reset();
            this.getQuaryStringAndSetvalue();
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  setValueAcordingApiRequirnment() {
    //concate ratings in answer----------------------------
    let i = 11;
    let answer = '';
    for (i = 11; i <= 20; i++) {
      if (i != 20) {
        answer = answer + this.feedbackForm.controls[`quetion${i}`].value + ',';
      } else {
        answer = answer + this.feedbackForm.controls[`quetion${i}`].value;
      }
    }
    this.feedbackForm.controls['Answers'].setValue(answer);

    //covert date formate into yyyy-mm-dd cause sql get dificulty to convert dd/mm/yyyy
    let startdate = this.feedbackForm.controls['StartDate'].value.split('/');
    let rqr_startdate = startdate[2] + '-' + startdate[1] + '-' + startdate[0];
    this.feedbackForm.controls['StartDate'].setValue(rqr_startdate);

    let enddate = this.feedbackForm.controls['EndDate'].value.split('/');
    let rqr_enddate = enddate[2] + '-' + enddate[1] + '-' + enddate[0];
    this.feedbackForm.controls['EndDate'].setValue(rqr_enddate);
  }

  get r() {
    return this.feedbackForm.controls;
  }
}
