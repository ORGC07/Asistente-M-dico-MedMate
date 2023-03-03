import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientesPageRoutingModule } from './pacientes-routing.module';

import { PacientesPage } from './pacientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientesPageRoutingModule
  ],
  declarations: [PacientesPage]
})
export class PacientesPageModule {}
