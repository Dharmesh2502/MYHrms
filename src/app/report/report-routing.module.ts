import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';

const routes: Routes = [
  { path: '', component: ReportComponent }, 
  { path: 'contact-directory', loadChildren: () => import('./contact-directory/contact-directory.module').then(m => m.ContactDirectoryModule) }, 
  { path: 'emp-on-leave', loadChildren: () => import('./emp-on-leave/emp-on-leave.module').then(m => m.EmpOnLeaveModule) },
  { path: 'daily-task-sheet', loadChildren: () => import('./daily-task-sheet/daily-task-sheet.module').then(m => m.DailyTaskSheetModule) },
  { path: 'monthly-report', loadChildren: () => import('./monthly-report/monthly-report.module').then(m => m.MonthlyReportModule)},
  { path: 'document', loadChildren: () => import('./salaryslip/salaryslip.module').then(m => m.SalaryslipModule) },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
