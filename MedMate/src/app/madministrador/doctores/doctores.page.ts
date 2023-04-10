import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { doctor } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: "app-doctores",
  templateUrl: "./doctores.page.html",
  styleUrls: ["./doctores.page.scss"],
})
export class DoctoresPage implements OnInit {
  doctores: any[] = [];
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
  uid: any;
  loading: any;

  path = "Doctores";

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: FirestoreService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    
    this.listadoctores();
    
  }

  listadoctores() {
    this.store.consultar<doctor>(this.path).subscribe((res) => {
      if (res) {
        this.doctores = [];
        res.forEach((r) => {
          this.infod = r;
          this.doctores.push(this.infod);
        });
      }
    });
  }

  async delete(doctor: doctor) {
    const alert = await this.alertController.create({
      cssClass: "normal",
      header: "Advertencia",
      message:
        "¿Seguro que deseas <strong>eliminar</strong> este doctor?",
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
              .deletedoc(this.path, doctor.uid)
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
