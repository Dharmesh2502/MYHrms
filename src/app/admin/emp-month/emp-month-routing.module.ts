import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpMonthComponent } from './emp-month.component';

const routes: Routes = [
  { path: '', component: EmpMonthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpMonthRoutingModule { }
