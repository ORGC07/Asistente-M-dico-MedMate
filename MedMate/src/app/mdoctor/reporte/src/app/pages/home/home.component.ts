import { Component, OnInit } from '@angular/core';
import { Reporte } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  reporte: Reporte[] = [];

  constructor(public firestoreService:FirestoreService) { 
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
}
