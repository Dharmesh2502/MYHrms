import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpOnLeaveComponent } from './emp-on-leave.component';

const routes: Routes = [{ path: '', component: EmpOnLeaveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpOnLeaveRoutingModule { }
