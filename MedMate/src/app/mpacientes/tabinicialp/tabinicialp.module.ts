import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabinicialpPageRoutingModule } from './tabinicialp-routing.module';

import { TabinicialpPage } from './tabinicialp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabinicialpPageRoutingModule
  ],
  declarations: [TabinicialpPage]
})
export class TabinicialpPageModule {}
