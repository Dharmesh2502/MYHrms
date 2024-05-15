import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord.component';
import { SharedModule } from '../shared/shared.module';
import { EventListComponent } from './event-list/event-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EmployeeOfMonthComponent } from './employee-of-month/employee-of-month.component';
import { HttpClientModule } from '@angular/common/http';
import { NewEmpJoinComponent } from './new-emp-join/new-emp-join.component';
import { AddvacancyModule } from '../admin/addvacancy/addvacancy.module';
import { AddvacancyRoutingModule } from '../admin/addvacancy/addvacancy-routing.module';
import { AddvacancyComponent } from '../admin/addvacancy/addvacancy.component';
import { VacancydataComponent } from './vacancydata/vacancydata.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    DashbordComponent,
    EventListComponent,
    EmployeeOfMonthComponent,
    NewEmpJoinComponent,
    VacancydataComponent,
    SliderComponent,
    NewEmpJoinComponent,
  ],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    HttpClientModule
  ]
})
export class DashbordModule { }
