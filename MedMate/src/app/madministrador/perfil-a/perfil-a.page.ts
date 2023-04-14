import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { administrador } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: "app-perfil-a",
  templateUrl: "./perfil-a.page.html",
  styleUrls: ["./perfil-a.page.scss"],
})
export class PerfilAPage implements OnInit {
  public patha = "Administrador";

  administrador: administrador[] = [];

  uid = "";
  public perfiladministrador: administrador | undefined;
  public administradores: administrador | undefined;

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
    this.store.getDoc<administrador>(this.patha, this.uid).subscribe((res) => {
      if (res) {
        this.administrador = [];
        this.administradores = res;
        this.administrador.push(this.administradores);
        this.administrador.forEach((a) => {
          if (this.uid == a.uid) {
            this.perfiladministrador = a;
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
    this.store.updatedoc(this.patha, id, updateDoc);

    
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
