import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ACitasPage } from './a-citas.page';

const routes: Routes = [
  {
    path: '',
    component: ACitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ACitasPageRoutingModule {}
