import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabinicialdPageRoutingModule } from './tabiniciald-routing.module';

import { TabinicialdPage } from './tabiniciald.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabinicialdPageRoutingModule
  ],
  declarations: [TabinicialdPage]
})
export class TabinicialdPageModule {}
