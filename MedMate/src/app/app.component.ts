import { Component, OnInit, ViewChild } from "@angular/core";
import { administrador, doctor, paciente } from "./models/interface";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { FirestoreService } from "./services/firestore.service";
import { IonApp, IonNav, NavController } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  doctor: doctor[] = [];
  paciente: paciente[] = [];
  administrador: administrador[] = [];
  uid = "";
  public perfilpaciente: paciente | undefined;
  public perfildoctor: doctor | undefined;
  public perfiladministrador: administrador | undefined;
  public pacientes: paciente | undefined;
  public doctores: doctor | undefined;
  public administradores: administrador | undefined;
  public rold = "Doctor";
  public rolp = "Paciente";
  public rola = "Administrador";
  pages: any;

  @ViewChild(IonNav)
  nav!: IonNav;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: FirestoreService,
    public navCtrl: NavController
  ) {}

  async menu() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
    }

    const pathp = "Pacientes";
    const pathd = "Doctores";
    const patha = "Administrador";

    this.store.getDoc<paciente>(pathp, this.uid).subscribe((res) => {
      if (res) {
        this.paciente = [];
        this.pacientes = res;
        this.paciente.push(this.pacientes);
        this.paciente.forEach((p) => {
          if(this.uid == p.uid){
            this.perfilpaciente = p;
          }
        })
      }
    });
    this.store.getDoc<doctor>(pathd, this.uid).subscribe((res) => {
      if (res) {
        this.doctor = [];
        this.doctores = res;
        this.doctor.push(this.doctores);
        this.doctor.forEach((d) => {
          if (this.uid == d.uid) {
            this.perfildoctor = d;
          }
        });
      }
    });

    this.store.getDoc<administrador>(patha, this.uid).subscribe((res) => {
      if (res) {
        this.administrador = [];
        this.administradores = res;
        this.administrador.push(this.administradores);
        this.administrador.forEach((a) => {
          if (this.uid == a.uid) {
            this.perfiladministrador = a;            
          }
        })
      }
    });
  }

  openPage(page: string) {
    this.router.navigate([page]);
  }

  logout() {
    this.auth.cerrars();
    this.router.navigate(["./login"]).then(() => {
      window.location.reload();
    });
  }
}
