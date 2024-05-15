import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord.component';
import { EmployeeOfMonthComponent } from './employee-of-month/employee-of-month.component';
import { EventListComponent } from './event-list/event-list.component';
import { NewEmpJoinComponent } from './new-emp-join/new-emp-join.component';

const routes: Routes = [
  { path: '', component: DashbordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
