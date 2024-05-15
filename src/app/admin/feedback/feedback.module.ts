import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { MisSubmitStatusComponent } from './mis-submit-status/mis-submit-status.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddModuleComponent } from './add-module/add-module.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackSendMailComponent } from './feedback-send-mail/feedback-send-mail.component';
import { MisReportComponent } from './mis-report/mis-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedbackformComponent } from './feedbackform/feedbackform.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@NgModule({
  declarations: [
    MisSubmitStatusComponent,
    AddDepartmentComponent,
    AddEmployeeComponent,
    AddModuleComponent,
    FeedbackListComponent,
    FeedbackSendMailComponent,
    MisReportComponent,
    FeedbackformComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers:[
    FeedbackService
  ]
})
export class FeedbackModule { }
