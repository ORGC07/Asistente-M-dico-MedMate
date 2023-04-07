import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasPageRoutingModule } from './citas-routing.module';

import { CitasPage } from './citas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasPageRoutingModule
  ],
  declarations: [CitasPage]
})
export class CitasPageModule {}
