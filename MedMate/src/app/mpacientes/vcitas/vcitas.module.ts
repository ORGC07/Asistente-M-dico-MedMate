import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VcitasPageRoutingModule } from './vcitas-routing.module';

import { VcitasPage } from './vcitas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VcitasPageRoutingModule
  ],
  declarations: [VcitasPage]
})
export class VcitasPageModule {}
