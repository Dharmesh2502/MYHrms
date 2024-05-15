import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryslipComponent } from './salaryslip.component';

const routes: Routes = [{ path: '', component: SalaryslipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryslipRoutingModule { }
