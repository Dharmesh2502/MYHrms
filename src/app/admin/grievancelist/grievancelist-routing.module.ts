import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrievancelistComponent } from './grievancelist.component';

const routes: Routes = [{ path: '', component: GrievancelistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrievancelistRoutingModule { }
