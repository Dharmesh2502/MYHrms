import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportantNoticeComponent } from './important-notice.component';

const routes: Routes = [{ path: '', component: ImportantNoticeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportantNoticeRoutingModule { }
