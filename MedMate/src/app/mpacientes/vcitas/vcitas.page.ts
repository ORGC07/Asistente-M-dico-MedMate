import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { cita, medicacion } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: "app-vcitas",
  templateUrl: "./vcitas.page.html",
  styleUrls: ["./vcitas.page.scss"],
})
export class VcitasPage implements OnInit {
  citas: any[] = [];
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
  uid: any;
  loading: any;

  path = "Citas";

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: FirestoreService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      this.cita();
    }
  }

  cita() {
    this.store.consultar<cita>(this.path).subscribe((res) => {
      if (res) {
        this.citas = [];
        res.forEach((r) => {
          if (r.idpaciente == this.uid) {
            this.infoc = r;
            this.citas.push(this.infoc);
          }
        });
      }
    });
  }

  async delete(medicamento: medicacion) {
    const alert = await this.alertController.create({
      cssClass: "normal",
      header: "Advertencia",
      message: "¿Seguro que deseas <strong>eliminar</strong> esta cita?",
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
            this.store
              .deletedoc(this.path, medicamento.id)
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
