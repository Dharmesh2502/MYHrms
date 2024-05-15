import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-mis-submit-status',
  templateUrl: './mis-submit-status.component.html',
  styleUrls: ['./mis-submit-status.component.scss'],
})
export class MisSubmitStatusComponent implements OnInit {
  isSubmit = true;
  statusarr: any = [];
  IsSelected = false;
  showarr: any = [];

  constructor(private feedback: FeedbackService) {}

  ngOnInit(): void {

    //parameter of my sp
    const json = {
      flag: '',
    };

    //gesting two table 1 for submit count and second one for not submit count
    this.feedback.GetSubmitStatus(json).subscribe(
      (data: any) => {
        this.statusarr = data;
      },
      (err: any) => {
        console.log(err);
        this.statusarr = [{emp_name :"data not available"}]
      }
    );
  }

  changeStatus(e: any) {
    this.IsSelected = true;
    if (e.target.value === 'Submitted') {
      this.isSubmit = true;
      if (this.statusarr.Table != null || this.statusarr.Table.length != 0) {
        this.showarr = this.statusarr.Table;
      } else {
        this.showarr = [{ emp_name: 'no data available' }];
      }
    } else if (e.target.value === 'Not Submitted') {
      this.isSubmit = false;
      if (this.statusarr.Table1 != null || this.statusarr.Table1.length != 0) {
        this.showarr = this.statusarr.Table1;
      } else {
        this.showarr = [{ emp_name: 'no data available' }];
      }
    } else {     
      this.IsSelected = false;
    }
  }
}
