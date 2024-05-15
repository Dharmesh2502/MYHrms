import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferCandidateRoutingModule } from './refer-candidate-routing.module';
import { ReferCandidateComponent } from './refer-candidate.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ReferCandidateComponent
  ],
  imports: [
    CommonModule,
    ReferCandidateRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ReferCandidateModule { }
