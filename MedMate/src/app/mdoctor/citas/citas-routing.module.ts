import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasPage } from './citas.page';

const routes: Routes = [
  {
    path: '',
    component: CitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasPageRoutingModule {}
