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
  selector: 'app-rpaciente',
  templateUrl: './rpaciente.page.html',
  styleUrls: ['./rpaciente.page.scss'],
})
export class RpacientePage implements OnInit {

  public formularioregistrop: FormGroup;
  

  constructor(private fb: FormBuilder, private alertController: AlertController, 
    private auth: AuthService, private store: FirestoreService, private router: Router) { 
    
    this.formularioregistrop = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'cedula': new FormControl("", Validators.required),
      'fnacimiento': new FormControl("", Validators.required),
      'edad': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required)
    })
  }

  async registrarse(){

    var f = this.formularioregistrop.value;

    if (this.formularioregistrop.invalid) {

      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debe de ingresar todos los campos o asegurarse que su contraseña tenga minimo 6 caracteres',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }

    else{
      var paciente = {
      uid: "",
      nombre: f.nombre,
      apellido: f.apellido,
      cedula: f.cedula,
      fnacimiento: f.fnacimiento,
      edad: f.edad,
      correo: f.correo,
      contraseña: f.contraseña,
      rol: "Paciente",
    }

    console.log(paciente)

    const res = await this.auth.registrar(paciente.correo, paciente.contraseña).catch(res => {
      console.log('error')
    })

    if (res){
      console.log("Usuario creado");
      const path = 'Pacientes'
      const Id = res.user!.uid;
      paciente.uid = Id;
      paciente.contraseña = null;

      await this.store.createDoc(paciente,path,Id)

      const alert2 = await this.alertController.create({
        header: 'Usuario creado',
        buttons: ['INICIO'],
      });

      await alert2.present();
      this.router.navigate(['../login'])

    }


    }

    
  }

  ngOnInit() {
  }

}
