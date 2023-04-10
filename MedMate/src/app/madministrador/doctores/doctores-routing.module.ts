import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctoresPage } from './doctores.page';

const routes: Routes = [
  {
    path: '',
    component: DoctoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctoresPageRoutingModule {}
