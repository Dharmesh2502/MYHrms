import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AttendreportRoutingModule } from './attendreport-routing.module';
import { AttendreportComponent } from './attendreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AttendreportComponent
    
  ],
  imports: [
    CommonModule,
    AttendreportRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class AttendreportModule { }
