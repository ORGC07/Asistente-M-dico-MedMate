import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { EstadoCita, cita } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: "app-citas",
  templateUrl: "./citas.page.html",
  styleUrls: ["./citas.page.scss"],
})
export class CitasPage implements OnInit {
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
    estado: "",
  };

  estados: EstadoCita[] = ["En espera" , "Aceptada" , "Rechazada"];

  constructor(
    private comp: AppComponent,
    private auth: AuthService,
    private store: FirestoreService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.citas();
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
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
            this.dates.push(this.infoc);
          }
        });
      }
    });
  }

  Cambio(cita: cita, evento: any) {
    
    const update = {
      estado: evento.target.value,
    };
    this.store.updatedoc("Citas", cita.id, update);
  }
}
