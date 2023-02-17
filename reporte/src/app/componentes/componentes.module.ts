import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReportesComponent } from './reportes/reportes.component';



@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
  CommonModule,
    IonicModule,
    RouterModule,
  ], exports:[
    ReportesComponent
  ]
})
export class ComponentesModule { }
