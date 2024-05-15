import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrievanceformRoutingModule } from './grievanceform-routing.module';
import { GrievanceformComponent } from './grievanceform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

  
@NgModule({
  declarations: [
    GrievanceformComponent
  ],
  imports: [
    CommonModule,
    GrievanceformRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GrievanceformModule { }
