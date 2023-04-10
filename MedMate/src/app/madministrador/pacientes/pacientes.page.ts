import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { paciente } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: "app-pacientes",
  templateUrl: "./pacientes.page.html",
  styleUrls: ["./pacientes.page.scss"],
})
export class PacientesPage implements OnInit {
  pacientes: any[] = [];
  infop: paciente = {
    uid: "",
    nombre: "",
    apellido: "",
    cedula: "",
    fnacimiento: "",
    edad: 0,
    correo: "",
    contraseña: "",
    rol: "Paciente",
  };
  uid: any;
  loading: any;

  path = "Pacientes";

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: FirestoreService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.listapacientes();    
  }

  listapacientes() {
    console.log("Entro")
    this.store.consultar<paciente>(this.path).subscribe((res) => {
      if (res) {
        this.pacientes = [];
        res.forEach((r) => {
          this.infop = r;
          this.pacientes.push(this.infop);
        });
      }
    });
  }
  async delete(paciente: paciente) {
    const alert = await this.alertController.create({
      cssClass: "normal",
      header: "Advertencia",
      message:
        "¿Seguro que deseas <strong>eliminar</strong> este paciente?",
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
              .deletedoc(this.path, paciente.uid)
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
