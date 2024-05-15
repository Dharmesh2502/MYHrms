import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { EmpOnLeaveModule } from './emp-on-leave/emp-on-leave.module';
import { ContactDirectoryModule } from './contact-directory/contact-directory.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ReportComponent,
    
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    EmpOnLeaveModule,
    ContactDirectoryModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ReportModule { }
