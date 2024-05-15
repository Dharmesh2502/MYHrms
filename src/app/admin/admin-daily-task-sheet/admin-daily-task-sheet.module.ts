import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDailyTaskSheetRoutingModule } from './admin-daily-task-sheet-routing.module';
import { AdminDailyTaskSheetComponent } from './admin-daily-task-sheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminDailyTaskSheetComponent
  ],
  imports: [
    CommonModule,
    AdminDailyTaskSheetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AdminDailyTaskSheetModule { }
