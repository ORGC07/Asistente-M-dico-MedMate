import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorioPage } from './directorio.page';

const routes: Routes = [
  {
    path: '',
    component: DirectorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorioPageRoutingModule {}
