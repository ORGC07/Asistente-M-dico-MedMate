import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RpacientePage } from './rpaciente.page';

const routes: Routes = [
  {
    path: '',
    component: RpacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RpacientePageRoutingModule {}
