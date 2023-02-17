import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'rpaciente',
    loadChildren: () => import('./rpaciente/rpaciente.module').then( m => m.RpacientePageModule)
  },
  {
    path: 'rdoctor',
    loadChildren: () => import('./rdoctor/rdoctor.module').then( m => m.RdoctorPageModule)
  },
  {
    path: 'tabiniciald',
    loadChildren: () => import('./mdoctor/tabiniciald/tabiniciald.module').then( m => m.TabinicialdPageModule)
  },
  {
    path: 'tabinicialp',
    loadChildren: () => import('./mpacientes/tabinicialp/tabinicialp.module').then( m => m.TabinicialpPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }