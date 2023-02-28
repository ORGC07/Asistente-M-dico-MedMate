import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RpacientePageRoutingModule } from './rpaciente-routing.module';

import { RpacientePage } from './rpaciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RpacientePageRoutingModule
  ],
  declarations: [RpacientePage]
})
export class RpacientePageModule {}
