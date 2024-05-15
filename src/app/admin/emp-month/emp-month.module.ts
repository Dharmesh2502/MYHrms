import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpMonthRoutingModule } from './emp-month-routing.module';
import { EmpMonthComponent } from './emp-month.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmpMonthComponent
  ],
  imports: [
    CommonModule,
    EmpMonthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class EmpMonthModule { }
