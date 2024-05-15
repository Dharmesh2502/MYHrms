import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveFormRoutingModule } from './leave-form-routing.module';
import { LeaveFormComponent } from './leave-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    LeaveFormComponent
  ],
  imports: [
    CommonModule,
    LeaveFormRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ]
})
export class LeaveFormModule { }
