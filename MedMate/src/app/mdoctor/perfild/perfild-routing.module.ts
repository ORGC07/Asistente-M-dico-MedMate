import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfildPage } from './perfild.page';

const routes: Routes = [
  {
    path: '',
    component: PerfildPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfildPageRoutingModule {}
