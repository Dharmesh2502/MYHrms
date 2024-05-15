import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyTaskSheetComponent } from './daily-task-sheet.component';

const routes: Routes = [{ path: '', component: DailyTaskSheetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyTaskSheetRoutingModule { }
