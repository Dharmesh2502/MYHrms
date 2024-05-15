import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportantNoticeRoutingModule } from './important-notice-routing.module';
import { ImportantNoticeComponent } from './important-notice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ImportantNoticeComponent
  ],
  imports: [
    CommonModule,
    ImportantNoticeRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ImportantNoticeModule { }
