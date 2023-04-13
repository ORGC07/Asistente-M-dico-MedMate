import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAPage } from './perfil-a.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilAPageRoutingModule {}
