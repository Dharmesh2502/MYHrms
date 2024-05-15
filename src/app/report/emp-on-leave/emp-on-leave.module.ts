import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpOnLeaveRoutingModule } from './emp-on-leave-routing.module';
import { EmpOnLeaveComponent } from './emp-on-leave.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmpOnLeaveComponent
  ],
  imports: [
    CommonModule,
    EmpOnLeaveRoutingModule,
    SharedModule
  ]
})
export class EmpOnLeaveModule { }
