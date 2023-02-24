import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { mainModule } from 'process';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Reporte } from '../../models';
import { ɵNullViewportScroller } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-set-reportes',
  templateUrl: './set-reportes.component.html',
  styleUrls: ['./set-reportes.component.scss'],
})
export class SetReportesComponent implements OnInit {
  
  reporte: Reporte[] = [];
  newReportes!: Reporte;

  enablenewReportes = false;

  private path = 'reportes/';
  loading: any;

  constructor(public menuController: MenuController,
              public firestoreService: FirestoreService,
              private loadingCtrl: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.leertRepo();
  }
  openMenu(){
    this.menuController.toggle('main');
  }

  guardarRepo(){
    this.showLoading();
    this.firestoreService.createRepo(this.newReportes, this.path, this.newReportes.id).then( res =>{
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
    }).catch(error => {
      this.presentToast('No se pudo guardar');
    });
  }
  leertRepo(){0
    this.firestoreService.getCollection<Reporte>(this.path).subscribe( res =>{
          this.reporte = res; 
    });
  }
  async deleteReporte(Reporte:Reporte){
    const alert = await this.alertController.create({
      cssClass:'normal',
      header: 'Advertencia',
      message: '¿Seguro que deseas <strong>eliminar</strong> este reporte?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass:'normal',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            this.firestoreService.deletetRepo(this.path, Reporte.id).then( res =>{
              this.alertController.dismiss();
              this.presentToast('Eliminado con exito');
            }).catch(error => {
              this.presentToast('No se pudo eliminar');
            });
          },
        },
      ],
    });
      await alert.present();
  }

  nuevo(){
    this.enablenewReportes = true;
    this.newReportes = {
      nombre: '',
      identificador: 0,
      edad: 0,
      peso: 0,
      altura: 0,
      medicamentos: '',
      condicion: '',
      id: this.firestoreService.getId(),
      fecha: new Date()
    };
  
  }
  async showLoading() {
     this.loading = await this.loadingCtrl.create({
      cssClass:'normal',
      message: 'Guardando...',
      spinner: 'circles',
    });

   await this.loading.present();
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      cssClass:'normal',
      message: msg,
      duration: 2000,
      icon:'thumbs-up-outline',
      color:'light'
    });

    await toast.present();
  }
  
}
