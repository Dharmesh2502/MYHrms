import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyReportRoutingModule } from './monthly-report-routing.module';
import { MonthlyReportComponent } from './monthly-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MonthlyReportComponent
  ],
  imports: [
    CommonModule,
    MonthlyReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MonthlyReportModule { }
