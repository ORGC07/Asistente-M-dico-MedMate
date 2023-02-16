import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabinicialpPage } from './tabinicialp.page';

const routes: Routes = [
  {
    path: '',
    component: TabinicialpPage,
    children: [
      {
    path: 'home',
    loadChildren: () => import('./../../mpacientes/home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: 'historial',
    loadChildren: () => import('./../../mpacientes/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'directorio',
    loadChildren: () => import('./../../mpacientes/directorio/directorio.module').then( m => m.DirectorioPageModule)
  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabinicialpPageRoutingModule {}
