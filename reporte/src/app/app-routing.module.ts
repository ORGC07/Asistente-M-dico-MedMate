import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetReportesComponent } from './backend/set-reportes/set-reportes.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'set-reporte', component: SetReportesComponent},
  {path: '',redirectTo: 'home',pathMatch: 'full' },
  {path: '**',redirectTo: 'home',pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
