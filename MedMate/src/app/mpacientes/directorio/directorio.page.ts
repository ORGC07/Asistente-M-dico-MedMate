import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { doctor } from "src/app/models/interface";
import { Router } from '@angular/router';

@Component({
  selector: "app-directorio",
  templateUrl: "./directorio.page.html",
  styleUrls: ["./directorio.page.scss"],
})
export class DirectorioPage implements OnInit {
  doctores: any[] = [];
  uid: any;
  infod: doctor = {
    uid: "",
    nombre: "",
    apellido: "",
    cedula: "",
    especialidad: "",
    correo: "",
    contraseña: "",
    rol: "Doctor",
  };

  constructor(
    private comp: AppComponent,
    private auth: AuthService,
    private router: Router,
    private store: FirestoreService
  ) {}

  async ngOnInit() {
    this.comp.menu();
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      this.doctor();
    }
  }

  doctor() {
    const path = "Doctores";
    this.store.consultar<doctor>(path).subscribe((res) => {
      if (res) {
        this.doctores = [];
        res.forEach((r) => {
            this.infod = r;
            this.doctores.push(this.infod), console.log(this.doctores);
          
        });
      }
    });
  }
  acita() {
    this.router.navigate(["../a-citas"]);
  }
}
