import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialidadPage } from './especialidad.page';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialidadPageRoutingModule {}
