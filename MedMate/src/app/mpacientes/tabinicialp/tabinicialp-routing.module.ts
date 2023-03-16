import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabinicialpPage } from './tabinicialp.page';

const routes: Routes = [
  {
    path: '',
    component: TabinicialpPage,
    children: [
      
    
  
 
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabinicialpPageRoutingModule {}
