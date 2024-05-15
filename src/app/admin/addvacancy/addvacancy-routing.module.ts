import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddvacancyComponent } from './addvacancy.component';

const routes: Routes = [{ path: '', component: AddvacancyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddvacancyRoutingModule { }
