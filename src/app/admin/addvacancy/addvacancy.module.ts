import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddvacancyRoutingModule } from './addvacancy-routing.module';
import { AddvacancyComponent } from './addvacancy.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VacancyService } from 'src/app/services/vacancy.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddvacancyComponent
  ],
  imports: [
    CommonModule,
    AddvacancyRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [VacancyService],
})
export class AddvacancyModule { }
