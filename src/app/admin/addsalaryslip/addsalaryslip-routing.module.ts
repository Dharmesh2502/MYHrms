import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsalaryslipComponent } from './addsalaryslip.component';

const routes: Routes = [{ path: '', component: AddsalaryslipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddsalaryslipRoutingModule { }
