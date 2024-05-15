import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventGalleryComponent } from './add-event-gallery.component';

const routes: Routes = [{ path: '', component: AddEventGalleryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEventGalleryRoutingModule { }
