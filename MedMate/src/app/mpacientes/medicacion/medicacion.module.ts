import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicacionPageRoutingModule } from './medicacion-routing.module';

import { MedicacionPage } from './medicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicacionPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [MedicacionPage]
})
export class MedicacionPageModule {}
