import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Reporte } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { __setFunctionName } from 'tslib';

@Component({
  selector: "app-historial",
  templateUrl: "./historial.page.html",
  styleUrls: ["./historial.page.scss"],
})
export class HistorialPage implements OnInit {
  constructor(
    private comp: AppComponent,
    private auth: AuthService,
    private store: FirestoreService,) { }

  historiales: any[] = [];
  infohis: Reporte = {
    nombre: "",
    idpaciente: "",
    edad: 0,
    peso: 0,
    altura: 0,
    medicamentos: "",
    condicion: "",  
    id: "",
    iddoctor: "",
    especialidad: "",
    doctorname: "",
    fecha: new Date,
  }


  ngOnInit() {
    this.comp.menu();
    this.historial();
  }

  async historial(){
    const idpaciente = await this.auth.getUid()

    this.store.consultar<Reporte>("reportes").subscribe((res) => {
      if (res) {
        this.historiales = []
        res.forEach((res2) => {
          if (res2.idpaciente == idpaciente) {
            this.infohis = res2;
            this.historiales.push(this.infohis)            
          }
        })
      }
    })

  }

}
