import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonFooter } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { cita, medicacion, paciente } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {

  infom: medicacion = {
    medicamento: "",
    cdias: 0,
    fecha: "",
    hora: 0,
    userid: "",
  };
  infoc: cita = {
    doctor: "",
    iddoctor: "",
    paciente: "",
    idpaciente: "",
    especialidad: "",
    fecha: new Date(),
    hora: 0,
  };
  info: paciente = null!;
  drugs: any[] = [];
  dates: any[] = [];
  uid: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: FirestoreService,
    private comp: AppComponent,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      this.medicamentos();
      this.citas();
      console.log("entro1");
      this.comp.menu();
      const path = "Pacientes";
      this.store.getDoc<paciente>(path, uid).subscribe(async (res) => {
      if (res) {
        this.info = res;
        console.log(this.info);
        const alert = await this.alertController.create({
          header: "Bienvenido",
          message: this.info.nombre +" "+ this.info.apellido,
          buttons: ["Aceptar"],
        });

        await alert.present();
        return;
      } });
      
      
      
  }}



  medicamentos() {
    const path = "Medicamentos";
    this.store.consultar<medicacion>(path).subscribe((res) => {
      if (res) {
        this.drugs = [];
        res.forEach((r) => {
          if (r.userid == this.uid) {
            this.infom = r;
            this.drugs.push(this.infom), console.log(this.drugs);
          }
        });
      }
    });
  }
  citas() {
    const path = "Citas";
    this.store.consultar<cita>(path).subscribe((res) => {
      if (res) {
        this.dates = [];
        res.forEach((r) => {
          if (r.idpaciente == this.uid) {
            this.infoc = r;
            this.dates.push(this.infoc), console.log(this.dates);
          }
        });
      }
    });
  }
}

