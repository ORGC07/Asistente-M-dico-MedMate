import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfildPageRoutingModule } from './perfild-routing.module';

import { PerfildPage } from './perfild.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfildPageRoutingModule
  ],
  declarations: [PerfildPage]
})
export class PerfildPageModule {}
