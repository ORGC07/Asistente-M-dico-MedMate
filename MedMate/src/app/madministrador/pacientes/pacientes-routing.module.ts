import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesPage } from './pacientes.page';

const routes: Routes = [
  {
    path: '',
    component: PacientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesPageRoutingModule {}
