import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddReferenceRoutingModule } from './add-reference-routing.module';
import { AddReferenceComponent } from './add-reference.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddReferenceComponent
  ],
  imports: [
    CommonModule,
    AddReferenceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AddReferenceModule { }
