import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendreportComponent } from './attendreport.component';

const routes: Routes = [{ path: '', component: AttendreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendreportRoutingModule { }
