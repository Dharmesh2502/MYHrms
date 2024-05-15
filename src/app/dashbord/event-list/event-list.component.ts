import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
declare var $: any;

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  Eventlistform: FormGroup;
  EventlistformSubmitted: boolean = false;
  temparr: any[] = [];
  datanotfound: boolean = false;
  posts: any[] = [];
  def: any[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private events: DashboardService
  ) {
    this.Eventlistform = this.formbuilder.group({
      event_date: [''],
      flag: [''],
    });
  }

  ngOnInit(): void {
    ;
    this.defaultlist();
  }

  ngAfterViewInit() {
    $('#datepicker')
      .datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true,
        //user cannot select dates that have passed
        startDate: '+0d',
        endDate: '',
        keyboardNavigation: false,
        orientation: 'auto-bottom',
        todayHighlight: true,
      })
      .on('change', (e: any) => this.ontextchange(e));
  }

  //method for showing events for selected date
  //Author - Deeksha
  ontextchange(e: any) {
    ;
    this.Eventlistform.controls['event_date'].setValue(e.target.value),
    this.Eventlistform.controls['flag'].setValue('selected');
    this.EventlistformSubmitted = true;
    if (this.Eventlistform.invalid) {
      alert('Something went wrong');
      return;
    } else {
      
      this.events.showevent(this.Eventlistform.value).subscribe(
        (define: any) => {
          this.def = define.ArrayOfResponse;        
          if (this.def == null || this.def.length === 0) {
            this.datanotfound = true;
          } else {
            this.datanotfound = false;
          }
        },
        (err: any) => { 
          console.log(err);
        }
      );
    }
  }

  //method for showing all events of next 30 days by default
  //Author - Deeksha
  defaultlist() {
    ;
    this.Eventlistform.controls['flag'].setValue('default');
    if (this.Eventlistform.invalid) {
      alert('Something went wrong');
      return;
    } else {
      
      this.events.showevent(this.Eventlistform.value).subscribe(
        (define) => {
          this.def = define.ArrayOfResponse;
          if (this.def == null) {
            this.datanotfound = true;
          } else {
            this.datanotfound = false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
}
