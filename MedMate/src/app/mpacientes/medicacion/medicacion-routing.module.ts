import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicacionPage } from './medicacion.page';

const routes: Routes = [
  {
    path: '',
    component: MedicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicacionPageRoutingModule {}
