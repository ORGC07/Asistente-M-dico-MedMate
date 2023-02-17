import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SetReportesComponent } from './set-reportes/set-reportes.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SetReportesComponent
  ],
  imports: [
CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class BackendModule { }
