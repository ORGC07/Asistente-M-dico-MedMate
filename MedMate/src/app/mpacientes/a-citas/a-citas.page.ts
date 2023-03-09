import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { cita, doctor, paciente } from "src/app/models/interface";
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
  selector: "app-a-citas",
  templateUrl: "./a-citas.page.html",
  styleUrls: ["./a-citas.page.scss"],
})
export class ACitasPage implements OnInit {
  public acitasform: FormGroup;

  uidpaciente: any;
  uiddoctor: any;
  infopaciente: paciente[] = [];
  infodoctor: doctor[] = [];
  newcita: cita = {
    doctor: "",
    iddoctor: "",
    paciente: "",
    idpaciente: "",
    especialidad: "",
    fecha: new Date(),
    hora: 0,
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: FirestoreService,
    private alertcontroller: AlertController
  ) {
    this.acitasform = this.fb.group({
      doctor: new FormControl("", Validators.required),
      fecha: new FormControl("", Validators.required),
      hora: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.getdoctores();
  }

  getdoctores() {
    const path = "Doctores";
    this.store.consultar<doctor>(path).subscribe((res) => {
      if (res) {
        this.infodoctor = res;
      }
    });
  }

  async agregar() {
    const f = this.acitasform.value;
    const uid = await this.auth.getUid();
    if (uid) {
      this.uidpaciente = uid;
    }

    const pathpaciente = "Pacientes";
    this.store.consultar<paciente>(pathpaciente).subscribe((res) => {
      if (res) {
        this.infopaciente = res;
      }
    });

    if (this.acitasform.invalid) {
      const alert = await this.alertcontroller.create({
        header: "Datos incompletos",
        message: "Debe de ingresar todos los campos",
      });

      await alert.present();
      return;
    } else {
      if (this.infopaciente) {
        this.newcita.doctor = "";
        this.newcita.especialidad = "";
        this.newcita.fecha = f.fecha;
        this.newcita.hora = f.hora;
        this.newcita.iddoctor = f.infodoctor;
        this.newcita.idpaciente = this.uidpaciente;
        this.newcita.paciente = "";

        console.log(this.newcita);
        console.log(this.infodoctor)
      }
    }
  }
}
