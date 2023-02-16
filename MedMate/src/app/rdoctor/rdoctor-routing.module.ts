import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RdoctorPage } from './rdoctor.page';

const routes: Routes = [
  {
    path: '',
    component: RdoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RdoctorPageRoutingModule {}
