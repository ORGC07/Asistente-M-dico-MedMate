import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonFooter } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { cita, medicacion, paciente } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

const fecha = new Date(); // crea un objeto Date con la fecha y hora actual del sistema
const horasistema = fecha.getHours(); // obtiene la hora actual (en formato de 24 horas)
const minutossistema = fecha.getMinutes(); // obtiene los minutos actuales

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
    id: "",
  };
  infoc: cita = {
    doctor: "",
    iddoctor: "",
    paciente: "",
    idpaciente: "",
    especialidad: "",
    fecha: new Date(),
    hora: 0,
    id: "",
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
    const path = 'Medicamentos';
    this.store.consultar<medicacion>(path).subscribe((res) => {
      if (res) {
        this.drugs = [];
        res.filter((med) => med.userid == this.uid) // Filtrar medicamentos del usuario actual
          .sort((a, b) => {
            // Ordenar por hora más cercana a la hora actual
            const horaA = new Date(a.fecha + ' ' + a.hora + ':00').getTime();
            const horaB = new Date(b.fecha + ' ' + b.hora + ':00').getTime();
            return Math.abs(horaA - fecha.getTime()) - Math.abs(horaB - fecha.getTime());
          })
          .slice(0, 2) // Mostrar solo los dos medicamentos más cercanos a la hora actual
          .forEach((med) => this.drugs.push(med));
        console.log(this.drugs);
      }
    });
  }

  citas() {
    const path = 'Citas';
    this.store.consultar<cita>(path).subscribe((res) => {
      if (res) {
        this.dates = [];
        res.filter((cita) => cita.idpaciente == this.uid) // Filtrar citas del usuario actual
          .filter((cita) => {
            const fechaCita = new Date(cita.fecha + ' ' + cita.hora + ':00');
            if (fechaCita.getTime() == fecha.getTime()) {
              // Si la cita es para hoy, solo mostrar si la hora es mayor que la hora actual
              return cita.hora > horasistema;
            } else if (fechaCita.getTime() > fecha.getTime()) {
              // Si la cita es para otro día, mostrar solo si la fecha no ha pasado
              return true;
            } else {
              // Si la cita es para otro día y la fecha ya pasó, no mostrar
              return false;
            }
          })
          .sort((a, b) => {
            // Ordenar por hora más cercana a la hora actual
            const horaA = new Date(a.fecha + ' ' + a.hora + ':00').getTime();
            const horaB = new Date(b.fecha + ' ' + b.hora + ':00').getTime();
            return Math.abs(horaA - fecha.getTime()) - Math.abs(horaB - fecha.getTime());
          })
          .slice(0, 2) // Mostrar solo las dos citas más cercanas a la hora actual
          .forEach((cita) => this.dates.push(cita));
        console.log(this.dates);
      }
    });
  }
}
