import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEventGalleryRoutingModule } from './add-event-gallery-routing.module';
import { AddEventGalleryComponent } from './add-event-gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@NgModule({
  declarations: [
    AddEventGalleryComponent
  ],
  imports: [
    CommonModule,
    AddEventGalleryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class AddEventGalleryModule { }
