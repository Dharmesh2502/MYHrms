import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyTaskSheetRoutingModule } from './daily-task-sheet-routing.module';
import { DailyTaskSheetComponent } from './daily-task-sheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DailyTaskSheetComponent
  ],
  imports: [
    CommonModule,
    DailyTaskSheetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class DailyTaskSheetModule { }
