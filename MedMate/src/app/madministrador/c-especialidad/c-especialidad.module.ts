import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CEspecialidadPageRoutingModule } from './c-especialidad-routing.module';

import { CEspecialidadPage } from './c-especialidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CEspecialidadPageRoutingModule
  ],
  declarations: [CEspecialidadPage]
})
export class CEspecialidadPageModule {}
