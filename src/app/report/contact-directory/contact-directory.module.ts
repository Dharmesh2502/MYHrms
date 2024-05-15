import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactDirectoryRoutingModule } from './contact-directory-routing.module';
import { ContactDirectoryComponent } from './contact-directory.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ContactDirectoryComponent
  ],
  imports: [
    CommonModule,
    ContactDirectoryRoutingModule,
    SharedModule
  ]
})
export class ContactDirectoryModule { }
