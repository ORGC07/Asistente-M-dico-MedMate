import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabinicialdPage } from './tabiniciald.page';
import { SetReportesComponent } from 'src/app/backend/set-reportes/set-reportes.component';
import { HomeComponent } from 'src/app/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: TabinicialdPage,
    children: [
      {
    path: 'home',
    loadChildren: () => import('./../../mdoctor/home/home.module').then( m => m.HomePageModule)
    },
    

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabinicialdPageRoutingModule {}
