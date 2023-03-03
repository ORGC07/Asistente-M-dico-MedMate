import { Component, OnInit } from '@angular/core';
import { Reporte } from 'src/app/models/interface';
import { FirestoreService } from 'src/app/services/firestore.services';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  reporte: Reporte[] = [];

  constructor(public firestoreService:FirestoreService,
    public menuController: MenuController) { 
    this.loadReportes();
  }
  private path = 'reportes/';

  ngOnInit() {}
  loadReportes(){
    this.firestoreService.getCollection<Reporte>(this.path).subscribe( res =>{
        console.log(res);
        this.reporte = res;
    })
  }
  openMenu(){
    this.menuController.toggle('main');
  }
}
