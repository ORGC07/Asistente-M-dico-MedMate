import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { especialidad } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: "app-c-especialidad",
  templateUrl: "./c-especialidad.page.html",
  styleUrls: ["./c-especialidad.page.scss"],
})
export class CEspecialidadPage implements OnInit {
  public especialidadform: FormGroup;

  uid: any;
  info: especialidad | undefined;
  newespecialidad: especialidad = {
    especialidad: "",
    id: this.store.getId(),
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: FirestoreService,
    private alertcontroller: AlertController
  ) {

    this.especialidadform = fb.group({
      especialidad: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  async ingresar(){

    var f = this.especialidadform.value;

    if (this.especialidadform.invalid) {
      const alert = await this.alertcontroller.create({
        header: "Datos incompletos",
        message: "Debe de ingresar todos los campos",
      });

      await alert.present();
      return;
      
    } else {

      this.newespecialidad.especialidad = f.especialidad;
      this.newespecialidad.id = this.store.getId();

      this.store.createDoc(this.newespecialidad, "Especialidades", this.newespecialidad.id)

      const alert2 = await this.alertcontroller.create({
        header: "Especialidad agregado",
      });

      await alert2.present();
      this.router.navigate(["../homea"]);
      
    }



  }
}
