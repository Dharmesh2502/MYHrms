import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryslipRoutingModule } from './salaryslip-routing.module';
import { SalaryslipComponent } from './salaryslip.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  declarations: [
    SalaryslipComponent
  ],
  imports: [
    CommonModule,
    SalaryslipRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule 
  ]
})
export class SalaryslipModule { }
