import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { FirestoreService } from "../services/firestore.service";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { administrador } from '../models/interface';

@Component({
  selector: "app-radministrador",
  templateUrl: "./radministrador.page.html",
  styleUrls: ["./radministrador.page.scss"],
})
export class RadministradorPage implements OnInit {

  public formularioregristroad: FormGroup;

  newadministrador: administrador = {
    uid: "",
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    llave: "",
    rol: "Administrador",
  };

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private auth: AuthService,
    private store: FirestoreService,
    private router: Router
  ) {

    this.formularioregristroad = this.fb.group({
      nombre: new FormControl("", Validators.required),
      apellido: new FormControl("", Validators.required),
      correo: new FormControl("", Validators.required),
      contraseña: new FormControl("", Validators.required),
      llave: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  async registrarse(){

    var f = this.formularioregristroad.value;

    if (this.formularioregristroad.invalid) {
      const alert = await this.alertController.create({
        header: "Datos incompletos",
        message:
          "Debe de ingresar todos los campos o asegurarse que su contraseña tenga minimo 6 caracteres",
        buttons: ["Aceptar"],
      });

      await alert.present();
      return;
    }
    else{
      if (f.llave == 1234567) {

        this.newadministrador.nombre = f.nombre;
        this.newadministrador.apellido = f.apellido;
        this.newadministrador.correo = f.correo;
        this.newadministrador.contraseña = f.contraseña;
        this.newadministrador.llave = f.llave;
        this.newadministrador.rol = "Administrador";

        const admin = await this.auth.registrar(this.newadministrador.correo, this.newadministrador.contraseña)

        if (admin) {
          const path = "Administrador"
          const Id = admin.user!.uid;
          this.newadministrador.uid = Id;
          this.newadministrador.contraseña = "";

          await this.store.createDoc(this.newadministrador, path, Id);

          const alert2 = await this.alertController.create({
            header: "Usuario creado",
            buttons: ["INICIO"],
          });

          await alert2.present();
          this.router.navigate(["../login"]);
        }
        
      } else {
        const alert = await this.alertController.create({
          header: "Llave de acceso incorrecta",
          message:
            "Debe de asegurarse que la llave sea la correcta",
          buttons: ["Aceptar"],
        });

        await alert.present();
        return;
        
      }
    }

  }
}
