import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddsalaryslipRoutingModule } from './addsalaryslip-routing.module';
import { AddsalaryslipComponent } from './addsalaryslip.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AddsalaryslipComponent
  ],
  imports: [
    CommonModule,
    AddsalaryslipRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AddsalaryslipModule { }
