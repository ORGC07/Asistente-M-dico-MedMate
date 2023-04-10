import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { medicacion } from "src/app/models/interface";
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
  selector: "app-vmedicamentos",
  templateUrl: "./vmedicamentos.page.html",
  styleUrls: ["./vmedicamentos.page.scss"],
})
export class VmedicamentosPage implements OnInit {
  drugs: any[] = [];
  infom: medicacion = {
    medicamento: "",
    cdias: 0,
    fecha: "",
    hora: 0,
    userid: "",
    id: "",
    nota: "",
  };
  uid: any;
  loading: any;

  path = "Medicamentos";

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
      this.medicamentos();
    }
  }

  medicamentos() {
    this.store.consultar<medicacion>(this.path).subscribe((res) => {
      if (res) {
        this.drugs = [];
        res.forEach((r) => {
          if (r.userid == this.uid) {
            this.infom = r;
            this.drugs.push(this.infom), console.log(this.drugs);
          }
        });
      }
    });
  }

  async delete(medicamento: medicacion) {
    const alert = await this.alertController.create({
      cssClass: "normal",
      header: "Advertencia",
      message: "¿Seguro que deseas <strong>eliminar</strong> este medicamento?",
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


