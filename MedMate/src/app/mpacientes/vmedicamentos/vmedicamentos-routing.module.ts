import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VmedicamentosPage } from './vmedicamentos.page';

const routes: Routes = [
  {
    path: '',
    component: VmedicamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VmedicamentosPageRoutingModule {}
