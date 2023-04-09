import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RadministradorPageRoutingModule } from './radministrador-routing.module';

import { RadministradorPage } from './radministrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RadministradorPageRoutingModule,
  ],
  declarations: [RadministradorPage],
})
export class RadministradorPageModule {}
