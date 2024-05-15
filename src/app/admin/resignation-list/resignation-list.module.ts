import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResignationListRoutingModule } from './resignation-list-routing.module';
import { ResignationListComponent } from './resignation-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ResignationListComponent
  ],
  imports: [
    CommonModule,
    ResignationListRoutingModule,
    SharedModule
  ]
})
export class ResignationListModule { }
