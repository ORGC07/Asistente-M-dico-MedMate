import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { AlertController } from '@ionic/angular';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulariologin: FormGroup;
  info: {} | undefined;
  

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
    private store: FirestoreService, private alertcontroller: AlertController, private menu: AppComponent) {

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
      if (Id){
       this.store.getDoc("Pacientes", Id).subscribe(res => { 
          if (res){
          this.info = res;
          if (this.info) {
            console.log(this.info)
            this.router.navigate(['./tabinicialp']);
          }
          
          } 
        });
        this.store.getDoc("Doctores", Id).subscribe(res => { 
          if (res){
          this.info = res;
          if (this.info) {
            console.log(this.info)
            this.router.navigate(['./tabiniciald']);
          }
          
          } 
        });
      
      
      }  

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
