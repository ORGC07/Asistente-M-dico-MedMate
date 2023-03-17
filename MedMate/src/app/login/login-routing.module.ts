import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
  path: "home",
    loadChildren: () =>
      import("./../mpacientes/home/home.module").then((m) => m.HomePageModule),
  },
  {
  path: "homed",
    loadChildren: () =>
      import("./../mdoctor/home/home.module").then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
