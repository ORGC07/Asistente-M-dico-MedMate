import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VmedicamentosPageRoutingModule } from './vmedicamentos-routing.module';

import { VmedicamentosPage } from './vmedicamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VmedicamentosPageRoutingModule
  ],
  declarations: [VmedicamentosPage]
})
export class VmedicamentosPageModule {}
