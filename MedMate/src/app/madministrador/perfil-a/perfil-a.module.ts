import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAPageRoutingModule } from './perfil-a-routing.module';

import { PerfilAPage } from './perfil-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAPageRoutingModule
  ],
  declarations: [PerfilAPage]
})
export class PerfilAPageModule {}
