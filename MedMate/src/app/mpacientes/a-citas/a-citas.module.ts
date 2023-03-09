import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ACitasPageRoutingModule } from './a-citas-routing.module';

import { ACitasPage } from './a-citas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ACitasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ACitasPage]
})
export class ACitasPageModule {}
