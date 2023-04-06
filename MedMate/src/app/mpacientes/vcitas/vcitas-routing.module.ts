import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VcitasPage } from './vcitas.page';

const routes: Routes = [
  {
    path: '',
    component: VcitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VcitasPageRoutingModule {}
