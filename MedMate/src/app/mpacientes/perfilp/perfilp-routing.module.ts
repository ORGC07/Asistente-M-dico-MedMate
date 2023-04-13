import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilpPage } from './perfilp.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilpPageRoutingModule {}
