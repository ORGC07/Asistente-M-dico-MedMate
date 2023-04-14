import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { doctor } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: "app-perfild",
  templateUrl: "./perfild.page.html",
  styleUrls: ["./perfild.page.scss"],
})
export class PerfildPage implements OnInit {
  public pathp = "Doctores";

  doctor: doctor[] = [];

  uid = "";
  public perfildoctor: doctor | undefined;
  public doctores: doctor | undefined;

  loading: any;

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
      this.perfil();
    }
  }

  perfil() {
    this.store.getDoc<doctor>(this.pathp, this.uid).subscribe((res) => {
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
  }

  async presentAlertPrompt(name: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Editar " + name,
      subHeader: "",
      inputs: [
        {
          name,
          type: "text",
          placeholder: "Ingresa su " + name,
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Aceptar",
          handler: async (eve) => {
            if (eve) {
              this.save(name, eve[name]);
            } else {
              const alert = await this.alertController.create({
                header: "Datos incompletos",
                message: "Debe de ingresar todos los campos",
              });

              await alert.present();
              return;
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async save(name: string, input: any) {
    const id = this.uid;
    const updateDoc = {
      [name]: input,
    };
    this.store.updatedoc(this.pathp, id, updateDoc);
    this.presentToast("Actualizado con exito");
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
