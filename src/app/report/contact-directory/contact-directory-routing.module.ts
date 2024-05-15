import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDirectoryComponent } from './contact-directory.component';

const routes: Routes = [{ path: '', component: ContactDirectoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactDirectoryRoutingModule { }
