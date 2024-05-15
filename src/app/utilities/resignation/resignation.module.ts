import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResignationRoutingModule } from './resignation-routing.module';
import { ResignationComponent } from './resignation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ResignationComponent
  ],
  imports: [
    CommonModule,
    ResignationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ResignationModule { }
