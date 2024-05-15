import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReferenceComponent } from './add-reference.component';

const routes: Routes = [{ path: '', component: AddReferenceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddReferenceRoutingModule { }
