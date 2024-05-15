import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrievancelistRoutingModule } from './grievancelist-routing.module';
import { GrievancelistComponent } from './grievancelist.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GrievancelistComponent
  ],
  imports: [
    CommonModule,
    GrievancelistRoutingModule,
    SharedModule,
  ]
})
export class GrievancelistModule { }
