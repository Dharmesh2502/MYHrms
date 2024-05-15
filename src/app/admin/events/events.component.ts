import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  Eventlistform: FormGroup;
  EventlistformSubmitted: boolean = false;
  del:any;
  def: any[] = [];
  post: any[] = [];
  noevents :boolean = false
  
  constructor(
    private formbuilder: FormBuilder,
    private events: DashboardService
  ) {
    this.Eventlistform = this.formbuilder.group({
      event_date: ['', Validators.required],
      event_name: ['', Validators.required],
      flag: [''],
    });
  }

  ngOnInit(): void {
    this.eventlist()
  }

  
//method for showing all events of next 30 days by default
  //Author - Deeksha
  eventlist() {
      
    this.Eventlistform.controls['flag'].setValue('default')
    const json = {
      flag : 'default'
    }  
      this.events.showevent(json).subscribe(
        (define:any) => {
          this.def = define.ArrayOfResponse;
          if(this.def === null || this.def.length === 0){
            this.noevents = true
          }
          else{
            this.noevents = false
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  ngAfterViewInit() {
    $('#datepicker')
      .datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        startDate: '+0d',
        endDate: '',
        keyboardNavigation: false,
        orientation: 'auto-bottom',
        todayHighlight: true,
      })
      .on('change', (e: any) =>
        this.Eventlistform.controls['event_date'].setValue(e.target.value)
      );
  }

 //method for admin to add events
  //Author - Deeksha
  Onaddclick() {
    ;
    this.EventlistformSubmitted = true;
    if (this.Eventlistform.invalid) {
      return;
    } else {
      this.events.addevent(this.Eventlistform.value).subscribe(
        (define: any) => {
          this.post = define.ArrayOfResponse;
         
          if(define.message == "Event added successfully")
          {
            Swal.fire('Done',define.message,'success'); 
            this.Eventlistform.reset();
            this.EventlistformSubmitted = false          
          }
          else
          {
            Swal.fire(define.message,'','warning');
          }
          this.eventlist()
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  get r() {
    return this.Eventlistform.controls;
  }
 
  Ondelclick(e:number){
      
    Swal.fire({
      title: 'Are you sure you want to delete the event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
      const json = {
        "event_id" : e
      }   
       this.events.delevent(json).subscribe(
         (define: any) => {
           this.del = define.ArrayOfResponse;
           if(define.message == "Event deleted successfully")
           {
             Swal.fire('Done',define.message,'success');           
           }
           else
           {
             Swal.fire(define.message,'','warning');
           }
           this.eventlist()
         },
         (err: any) => {
           console.log(err);
         }
       );
      }   
   })
  }
}
