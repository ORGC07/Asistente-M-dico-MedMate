import { NgModule} from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetReportesComponent } from './backend/set-reportes/set-reportes.component';
import { PagesModule } from './pages/pages.module';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  
  {
    path: "rpaciente",
    loadChildren: () =>
      import("./rpaciente/rpaciente.module").then((m) => m.RpacientePageModule),
  },
  {
    path: "rdoctor",
    loadChildren: () =>
      import("./rdoctor/rdoctor.module").then((m) => m.RdoctorPageModule),
  },
  {
    path: "tabiniciald",
    loadChildren: () =>
      import("./mdoctor/tabiniciald/tabiniciald.module").then(
        (m) => m.TabinicialdPageModule
      ),
  },
  {
    path: "tabinicialp",
    loadChildren: () =>
      import("./mpacientes/tabinicialp/tabinicialp.module").then(
        (m) => m.TabinicialpPageModule
      ),
  },
  {
    path: "medicacion",
    loadChildren: () =>
      import("./mpacientes/medicacion/medicacion.module").then(
        (m) => m.MedicacionPageModule
      ),
  },
  {
    path: "a-citas",
    loadChildren: () =>
      import("./mpacientes/a-citas/a-citas.module").then(
        (m) => m.ACitasPageModule
      ),
  },
  {
    path: "pacientes",
    loadChildren: () =>
      import("./mdoctor/pacientes/pacientes.module").then(
        (m) => m.PacientesPageModule
      ),
  },
  {
    path: "set-reportes",
    component: SetReportesComponent,
  },
  {
    path: "lista-reporte",
    component: HomeComponent,
  },
  {
    path: "homed",
    loadChildren: () =>
      import("./mdoctor/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "historial",
    loadChildren: () =>
      import("./mpacientes/historial/historial.module").then(
        (m) => m.HistorialPageModule
      ),
  },
  {
    path: "medicamento",
    loadChildren: () =>
      import("./mpacientes/medicacion/medicacion.module").then(
        (m) => m.MedicacionPageModule
      ),
  },
  {
    path: "a-citas",
    loadChildren: () =>
      import("./mpacientes/a-citas/a-citas.module").then(
        (m) => m.ACitasPageModule
      ),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./mpacientes/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "directorio",
    loadChildren: () =>
      import("./mpacientes/directorio/directorio.module").then(
        (m) => m.DirectorioPageModule
      ),
  },
  {
    path: 'vmedicamentos',
    loadChildren: () => import('./mpacientes/vmedicamentos/vmedicamentos.module').then( m => m.VmedicamentosPageModule)
  },
  {
    path: 'vcitas',
    loadChildren: () => import('./mpacientes/vcitas/vcitas.module').then( m => m.VcitasPageModule)
  },
  {
    path: 'citasd',
    loadChildren: () => import('./mdoctor/citas/citas.module').then( m => m.CitasPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
