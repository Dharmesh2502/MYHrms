import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilitiesComponent } from './utilities.component';

const routes: Routes = [
  { path: '', component: UtilitiesComponent },
  { path: 'leave', loadChildren: () => import('./leave-form/leave-form.module').then(m => m.LeaveFormModule) },
  { path: 'add-reference', loadChildren: () => import('./add-reference/add-reference.module').then(m => m.AddReferenceModule) },
  
  { path: 'grievanceform', loadChildren: () => import('./grievanceform/grievanceform.module').then(m => m.GrievanceformModule) },
  { path: 'resignation', loadChildren: () => import('./resignation/resignation.module').then(m => m.ResignationModule) },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
