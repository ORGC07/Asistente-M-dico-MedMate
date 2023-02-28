import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RdoctorPageRoutingModule } from './rdoctor-routing.module';

import { RdoctorPage } from './rdoctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RdoctorPageRoutingModule
  ],
  declarations: [RdoctorPage]
})
export class RdoctorPageModule {}
