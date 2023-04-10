import { Component, OnInit } from '@angular/core';
import { Reporte } from 'src/app/models/interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  reporte: any[] = [];

  infor: Reporte = {
    nombre: "",
    idpaciente: "",
    edad: 0,
    peso: 0,
    altura: 0,
    medicamentos: "",
    condicion: "",
    id: this.store.getId(),
    iddoctor: "",
    especialidad: "",
    doctorname: "",
    fecha: new Date(),
  };

  constructor(
    public store: FirestoreService,
    public menuController: MenuController,
    public auth: AuthService
  ) {
    this.loadReportes();
  }
  private path = "reportes/";

  uid: any;

  async ngOnInit() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
    }
  }

  loadReportes() {

    this.store.consultar<Reporte>(this.path).subscribe((res) => {
      res.forEach((reportes) => {
        if (reportes.iddoctor == this.uid) {
          this.reporte = [];
          this.infor = reportes;
          this.reporte.push(this.infor)
          console.log(reportes);
        }
      });
    });
  }
  openMenu() {
    this.menuController.toggle("main");
  }
}
