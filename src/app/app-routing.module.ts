import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackformComponent } from './admin/feedback/feedbackform/feedbackform.component';
import { SetPasswordComponent } from './forgot-password/set-password/set-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticationGuard } from './auth/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'dashboard', loadChildren: () => import('./dashbord/dashbord.module').then(m => m.DashbordModule) ,canActivate:[AuthenticationGuard]},
  { path: 'important-notice', loadChildren: () => import('./admin/important-notice/important-notice.module').then(m => m.ImportantNoticeModule),canActivate:[AuthenticationGuard]},
  { path: 'events', loadChildren: () => import('./admin/events/events.module').then(m => m.EventsModule) ,canActivate:[AuthenticationGuard]},
  { path: 'emp-month', loadChildren: () => import('./admin/emp-month/emp-month.module').then(m => m.EmpMonthModule),canActivate:[AuthenticationGuard]},
  { path: 'addvacancy', loadChildren: () => import('./admin/addvacancy/addvacancy.module').then(m => m.AddvacancyModule) ,canActivate:[AuthenticationGuard]},
  { path: 'add-event-gallery', loadChildren: () => import('./admin/add-event-gallery/add-event-gallery.module').then(m => m.AddEventGalleryModule),canActivate:[AuthenticationGuard]},
  { path: 'utilities', loadChildren: () => import('./utilities/utilities.module').then(m => m.UtilitiesModule), },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule),canActivate:[AuthenticationGuard]},
  { path: 'contact-directory', loadChildren: () => import('./report/contact-directory/contact-directory.module').then(m => m.ContactDirectoryModule),canActivate:[AuthenticationGuard] },
  { path: 'admin-dashborad', loadChildren: () => import('./admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)},
  { path: 'grievancelist', loadChildren: () => import('./admin/grievancelist/grievancelist.module').then(m => m.GrievancelistModule),canActivate:[AuthenticationGuard]},
  { path: 'refercandidate', loadChildren: () => import('./admin/refer-candidate/refer-candidate.module').then(m => m.ReferCandidateModule),canActivate:[AuthenticationGuard]},
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),canActivate:[AuthenticationGuard]},
  { path: 'feedback', loadChildren: () => import('./admin/feedback/feedback.module').then(m => m.FeedbackModule),canActivate:[AuthenticationGuard]},
  { path: 'resignation-list', loadChildren: () => import('./admin/resignation-list/resignation-list.module').then(m => m.ResignationListModule),canActivate:[AuthenticationGuard] },
  { path: 'Attendance-report', loadChildren: () => import('./admin/attendreport/attendreport.module').then(m => m.AttendreportModule),canActivate:[AuthenticationGuard]},
  { path: 'feedbackform', component:FeedbackformComponent },
  { path: 'allvacancy', loadChildren: () => import('./all-vacancy-data/all-vacancy-data.module').then(m => m.AllVacancyDataModule) ,canActivate:[AuthenticationGuard]},
  { path: 'addsalaryslip', loadChildren: () => import('./admin/addsalaryslip/addsalaryslip.module').then(m => m.AddsalaryslipModule) ,canActivate:[AuthenticationGuard]},
  { path: 'admintasksheet', loadChildren: () => import('./admin/admin-daily-task-sheet/admin-daily-task-sheet.module').then(m => m.AdminDailyTaskSheetModule) ,canActivate:[AuthenticationGuard]},
  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
