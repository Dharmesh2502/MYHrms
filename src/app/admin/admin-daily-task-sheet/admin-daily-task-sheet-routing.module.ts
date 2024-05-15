import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDailyTaskSheetComponent } from './admin-daily-task-sheet.component';

const routes: Routes = [{ path: '', component: AdminDailyTaskSheetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDailyTaskSheetRoutingModule { }
