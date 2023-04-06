import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { AppComponent } from "src/app/app.component";
import { cita, doctor } from "src/app/models/interface";
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  info: doctor = null!;
  dates: any[] = [];
  uid: any;
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

  constructor(
    private comp: AppComponent,
    private auth: AuthService,
    private store: FirestoreService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.comp.menu();
    this.citas();
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;

      console.log("entro1");
      const path = "Doctores";
      this.store.getDoc<doctor>(path, uid).subscribe(async (res) => {
        if (res) {
          this.info = res;
          console.log(this.info);
          const alert = await this.alertController.create({
            header: "Bienvenido",
            message: this.info.nombre + " " + this.info.apellido,
            buttons: ["Aceptar"],
          });

          await alert.present();
          return;
        }
      });
    }
  }

  citas() {
    const path = "Citas";
    this.store.consultar<cita>(path).subscribe((res) => {
      if (res) {
        this.dates = [];
        res.forEach((r) => {
          if (r.iddoctor == this.uid) {
            this.infoc = r;
            this.dates.push(this.infoc), console.log(this.dates);
          }
        });
      }
    });
  }
}
