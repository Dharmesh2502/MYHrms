import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllVacancyDataComponent } from './all-vacancy-data.component';

const routes: Routes = [{ path: '', component: AllVacancyDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllVacancyDataRoutingModule { }
