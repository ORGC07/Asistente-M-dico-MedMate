import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { especialidad } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: "app-especialidad",
  templateUrl: "./especialidad.page.html",
  styleUrls: ["./especialidad.page.scss"],
})
export class EspecialidadPage implements OnInit {
  especialidades: any[] = [];
  infoe: especialidad = {
    especialidad: "",
    id: "",
  };
  uid: any;
  loading: any;

  path = "Especialidades";

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
      this.listaespecialidad();
    }
  }

  listaespecialidad() {
    this.store.consultar<especialidad>(this.path).subscribe((res) => {
      if (res) {
        this.especialidades = [];
        res.forEach((r) => {
          this.infoe = r;
          this.especialidades.push(this.infoe);
        });
      }
    });
  }

  async delete(especialidad: especialidad) {
    const alert = await this.alertController.create({
      cssClass: "normal",
      header: "Advertencia",
      message: "¿Seguro que deseas <strong>eliminar</strong> esta especialidad?",
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
              .deletedoc(this.path, especialidad.id)
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
