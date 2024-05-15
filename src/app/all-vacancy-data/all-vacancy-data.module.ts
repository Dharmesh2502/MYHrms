import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllVacancyDataRoutingModule } from './all-vacancy-data-routing.module';
import { AllVacancyDataComponent } from './all-vacancy-data.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    AllVacancyDataComponent
  ],
  imports: [
    CommonModule,
    AllVacancyDataRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
  ]
})
export class AllVacancyDataModule { }
