import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveFormComponent } from './leave-form.component';

const routes: Routes = [{ path: '', component: LeaveFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveFormRoutingModule { }
