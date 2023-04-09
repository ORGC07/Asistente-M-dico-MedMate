import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RadministradorPage } from './radministrador.page';

const routes: Routes = [
  {
    path: '',
    component: RadministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadministradorPageRoutingModule {}
