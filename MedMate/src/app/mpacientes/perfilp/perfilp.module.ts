import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilpPageRoutingModule } from './perfilp-routing.module';

import { PerfilpPage } from './perfilp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilpPageRoutingModule
  ],
  declarations: [PerfilpPage]
})
export class PerfilpPageModule {}
