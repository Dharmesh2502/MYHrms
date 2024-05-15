import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrievanceformComponent } from './grievanceform.component';

const routes: Routes = [{ path: '', component: GrievanceformComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrievanceformRoutingModule { }
