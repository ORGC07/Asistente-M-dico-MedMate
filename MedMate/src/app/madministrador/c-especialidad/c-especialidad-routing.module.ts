import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CEspecialidadPage } from './c-especialidad.page';

const routes: Routes = [
  {
    path: '',
    component: CEspecialidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CEspecialidadPageRoutingModule {}
