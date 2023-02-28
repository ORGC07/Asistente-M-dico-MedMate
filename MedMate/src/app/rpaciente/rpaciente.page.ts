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
import { paciente } from '../models/interface';
import { empty } from 'rxjs';

@Component({
  selector: 'app-rpaciente',
  templateUrl: './rpaciente.page.html',
  styleUrls: ['./rpaciente.page.scss'],
})
export class RpacientePage implements OnInit {

  public formularioregistrop: FormGroup;

  newpaciente: paciente= {
    uid: "",
    nombre: "",
    apellido: "",
    cedula: "",
    fnacimiento: "",
    edad: 0,
    correo:"",
    contraseña: "",
    rol: "Paciente",
  }
  

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
      
      this.newpaciente.nombre = f.nombre,
      this.newpaciente.apellido= f.apellido,
      this.newpaciente.cedula= f.cedula,
      this.newpaciente.fnacimiento= f.fnacimiento,
      this.newpaciente.edad= f.edad,
      this.newpaciente.correo= f.correo,
      this.newpaciente.contraseña= f.contraseña,
      this.newpaciente.rol= "Paciente";
    

    console.log(this.newpaciente)

    const res = await this.auth.registrar(this.newpaciente.correo, this.newpaciente.contraseña).catch(res => {
      console.log('error')
    })

    if (res){
      console.log("Usuario creado");
      const path = 'Pacientes'
      const Id = res.user!.uid;
      this.newpaciente.uid = Id;
      this.newpaciente.contraseña = "";

      await this.store.createDoc(this.newpaciente,path,Id)

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
