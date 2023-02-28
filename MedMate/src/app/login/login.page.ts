import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulariologin: FormGroup;

  

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
    private store: FirestoreService, private alertcontroller: AlertController) {

    this.formulariologin = this.fb.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
   }

   async ingresar(){
    var form= this.formulariologin.value;

    const res = await this.auth.login(form.user, form.password);

    if(res){
      console.log("Usuario correcto")
      const Id = res.user?.uid;
      const pacientes = this.store.consultar("Pacientes").subscribe(res => {
        console.log(res)
        
      });

      console.log(pacientes);
      const doctores = this.store.consultar("Doctores");

      

      
      this.router.navigate([''])

    }
    
    if(this.formulariologin.invalid){
    console.log("Usuario incorrecto")
    const alert = await this.alertcontroller.create({
        header: 'Contraseña o usuario incorrecto',
        message: 'Asegurese que su contraseña y usuario sean correctos o registrese',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
   }
   }

   

  ngOnInit() {
  }

}
