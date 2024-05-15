import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResignationComponent } from './resignation.component';

const routes: Routes = [{ path: '', component: ResignationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResignationRoutingModule { }
