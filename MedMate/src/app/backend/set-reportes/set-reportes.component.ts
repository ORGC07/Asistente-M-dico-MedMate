import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  LoadingController,
  MenuController,
  ToastController,
} from "@ionic/angular";
import { mainModule } from "process";
import { FirestoreService } from "src/app/services/firestore.services";

import { ɵNullViewportScroller } from "@angular/common";
import { error } from "console";
import { Reporte, doctor, paciente } from "src/app/models/interface";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-set-reportes",
  templateUrl: "./set-reportes.component.html",
  styleUrls: ["./set-reportes.component.scss"],
})
export class SetReportesComponent implements OnInit {
  almacenarReporte: Reporte[] = [];
  newReportes!: Reporte;
  pacientes: paciente[] = [];
  doctores: doctor[] = [];
  infopacientes: paciente[] = [];
  uiddoctor: any;

  reporte: Reporte = {
    nombre: "",
    idpaciente: "",
    edad: 0,
    peso: 0,
    altura: 0,
    medicamentos: "",
    condicion: "",
    id: this.firestoreService.getId(),
    iddoctor: "",
    especialidad: "",
    doctorname: "",
    fecha: new Date(),
  };

  enablenewReportes = false;

  private path = "reportes/";
  loading: any;

  constructor(
    public menuController: MenuController,
    public firestoreService: FirestoreService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.leertRepo();
    this.getpacientes();
  }

  getpacientes() {
    this.firestoreService
      .getCollection<paciente>("Pacientes")
      .subscribe((res) => {
        if (res) {
          this.infopacientes = res;
        }
      });
  }

  openMenu() {
    this.menuController.toggle("main");
  }

  async guardarRepo() {
    let reporteCreado = false;

    const uid = await this.auth.getUid();
    this.showLoading();

    this.firestoreService
      .getCollection<paciente>("Pacientes")
      .subscribe((res) => {
        if (res) {
          this.pacientes = res;
          this.pacientes.forEach((pac) => {
            if (pac.uid == this.newReportes.idpaciente) {
              this.firestoreService
                .getCollection<doctor>("Doctores")
                .subscribe((res2) => {
                  this.doctores = res2;
                  this.doctores.forEach((doc) => {
                    if (doc.uid == uid) {
                      if (uid) {
                        this.uiddoctor = uid;
                        this.newReportes = {
                          nombre: pac.nombre + " " + pac.apellido,
                          idpaciente: pac.uid,
                          edad: pac.edad,
                          peso: this.newReportes.peso,
                          altura: this.newReportes.altura,
                          medicamentos: this.newReportes.medicamentos,
                          condicion: this.newReportes.condicion,
                          iddoctor: uid,
                          especialidad: doc.especialidad,
                          doctorname: doc.nombre + " " + doc.apellido,
                          id: this.firestoreService.getId(),
                          fecha: new Date(),
                        };
                        if (!reporteCreado) {
                          this.firestoreService
                            .createRepo(
                              this.newReportes,
                              this.path,
                              this.newReportes.id
                            )
                            .then((res) => {
                              this.loading.dismiss();
                              this.presentToast("Guardado con exito");
                            })
                            .catch((error) => {
                              this.presentToast("No se pudo guardar");
                            });
                          reporteCreado = true;
                        }
                      }
                    }
                  });
                });
            }
          });
        }
      });
  }
  async leertRepo() {
    
    this.uiddoctor = await this.auth.getUid();
    this.firestoreService.getCollection<Reporte>(this.path).subscribe((res) => {
      this.almacenarReporte = [];
      res.forEach((r) => {
        if (r.iddoctor == this.uiddoctor) {
          this.reporte = r;
          this.almacenarReporte.push(r)
          
        }
      });
    });
  }
  async deleteReporte(Reporte: Reporte) {
    const alert = await this.alertController.create({
      cssClass: "normal",
      header: "Advertencia",
      message: "¿Seguro que deseas <strong>eliminar</strong> este reporte?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "normal",
          handler: () => {
            console.log("Alert canceled");
          },
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            console.log("Alert confirmed");
            this.firestoreService
              .deletetRepo(this.path, Reporte.id)
              .then((res) => {
                this.alertController.dismiss();
                this.presentToast("Eliminado con exito");
              })
              .catch((error) => {
                this.presentToast("No se pudo eliminar");
              });
          },
        },
      ],
    });
    await alert.present();
  }

  nuevo() {
    this.enablenewReportes = true;
    this.newReportes = {
      nombre: "",
      idpaciente: "",
      edad: 0,
      peso: 0,
      altura: 0,
      medicamentos: "",
      condicion: "",
      id: this.firestoreService.getId(),
      iddoctor: "",
      especialidad: "",
      doctorname: "",
      fecha: new Date(),
    };
  }
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: "normal",
      message: "Guardando...",
      spinner: "circles",
    });

    await this.loading.present();
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      cssClass: "normal",
      message: msg,
      duration: 2000,
      icon: "thumbs-up-outline",
      color: "light",
    });

    await toast.present();
  }
}
