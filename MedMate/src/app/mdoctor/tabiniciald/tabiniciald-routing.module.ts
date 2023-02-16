import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabinicialdPage } from './tabiniciald.page';

const routes: Routes = [
  {
    path: '',
    component: TabinicialdPage,
    children: [
      {
    path: 'home',
    loadChildren: () => import('./../../mdoctor/home/home.module').then( m => m.HomePageModule)
    },
    {
    path: 'pacientes',
    loadChildren: () => import('./../../mdoctor/pacientes/pacientes.module').then( m => m.PacientesPageModule)
  },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabinicialdPageRoutingModule {}
