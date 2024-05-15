import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddModuleComponent } from './add-module/add-module.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackSendMailComponent } from './feedback-send-mail/feedback-send-mail.component';
import { FeedbackformComponent } from './feedbackform/feedbackform.component';
import { MisReportComponent } from './mis-report/mis-report.component';

import { MisSubmitStatusComponent } from './mis-submit-status/mis-submit-status.component';

const routes: Routes = [
  { path: 'mis-submit', component: MisSubmitStatusComponent },
  { path: 'add-dept', component: AddDepartmentComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'add-module', component: AddModuleComponent },
  { path: 'feedback-list',component:FeedbackListComponent},
  { path: 'feedback-send-mail',component:FeedbackSendMailComponent},
  {path:'mis-report',component:MisReportComponent},
  {path:'feedbackform',component:FeedbackformComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
