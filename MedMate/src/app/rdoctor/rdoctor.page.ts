import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rdoctor',
  templateUrl: './rdoctor.page.html',
  styleUrls: ['./rdoctor.page.scss'],
})
export class RdoctorPage implements OnInit {

  formularioregistrod: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController,
     private auth: AuthService, private store: FirestoreService, private router: Router ) {
    
    
    this.formularioregistrod = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'apellido': new FormControl("",Validators.required),
      'cedula': new FormControl("",Validators.required),
      'especialidad': new FormControl("",Validators.required),
      'correo': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required),
    })
   }

  async registrarse(){


    const f = this.formularioregistrod.value

    if (this.formularioregistrod.invalid) {

      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debe de ingresar todos los campos o asegurarse que su contraseña tenga minimo 6 caracteres',
        buttons: ['Aceptar'],
      });

      await alert.present() ;
      return;
    }

    // if (f.contraseña < 6) {

    //   const alert3 = await this.alertController.create({
    //     header: 'Contraseña muy corta',
    //     message: 'La contraseña debe de tener minimo 6 caracteres',
    //     buttons: ['Aceptar'],
    //   });

    //   await alert3.present() ;
    //   return;
    // }

    else{
      var doctor = {
        uid: "",
        nombre: f.nombre,
        apellido: f.apellido,
        cedula: f.cedula,
        especialidad: f.especialidad,
        correo: f.correo,
        contraseña: f.contraseña,
        rol: "Doctor",
      }

    }
    
    const res = await this.auth.registrar(doctor.correo, doctor.contraseña).catch(res => {
      console.log('error');
    })

    if(res){
      console.log("Usuario creado")
      const path = 'Doctores';
      const Id = res.user!.uid;
      doctor.uid = Id;
      doctor.contraseña = null;

      await this.store.createDoc(doctor, path, Id);

      const alert2 = await this.alertController.create({
        header: 'Usuario creado',
        buttons: ['INICIO'],
      });

      await alert2.present();
      this.router.navigate(['../login'])

    }

    
      
  }

  ngOnInit() {
  }

}
