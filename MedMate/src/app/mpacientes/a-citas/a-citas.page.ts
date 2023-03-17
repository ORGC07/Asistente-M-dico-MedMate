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

  pathpaciente = "Pacientes";
  pathdoctor = "Doctores";
  uidpaciente: any;
  uiddoctor: any;
  infodoctor: doctor[] = [];
  doctores: doctor[] = [];
  pacientes: paciente[] = [];

  doctor: doctor = {
    uid: "",
    nombre: "",
    apellido: "",
    cedula: "",
    especialidad: "",
    correo: "",
    contraseña: "",
    rol: "Doctor",
  };
  paciente: paciente = {
    uid: "",
    nombre: "",
    apellido: "",
    cedula: "",
    fnacimiento: "",
    edad: 0,
    correo: "",
    contraseña: "",
    rol: "Paciente",
  };

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
    this.store.consultar<doctor>(this.pathdoctor).subscribe((res) => {
      if (res) {
        this.infodoctor = res;
      }
    });
  }

  async agregar() {
    var f = this.acitasform.value;
    const uid = await this.auth.getUid();

    this.uiddoctor = f.doctor;

    this.store.consultar<doctor>(this.pathdoctor).subscribe((res) => {
      if (res) {
        this.doctores = res;
        this.doctores.forEach(async (docs) => {
          if (docs.uid == this.uiddoctor) {
            this.doctor = docs;
            if (uid) {
              this.uidpaciente = uid;
              this.store
                .consultar<paciente>(this.pathpaciente)
                .subscribe((pac) => {
                  if (pac) {
                    this.pacientes = pac;
                    this.pacientes.forEach(async (pac2) => {
                      if (pac2.uid == this.uidpaciente) {
                        this.paciente = pac2;
                        if (this.acitasform.invalid) {
                          const alert = await this.alertcontroller.create({
                            header: "Datos incompletos",
                            message: "Debe de ingresar todos los campos",
                          });

                          await alert.present();
                          return;
                        } else {
                          this.newcita.doctor = this.doctor.nombre;
                          this.newcita.especialidad = this.doctor.especialidad;
                          this.newcita.fecha = f.fecha;
                          this.newcita.hora = f.hora;
                          this.newcita.iddoctor = this.doctor.uid;
                          this.newcita.idpaciente = this.uidpaciente;
                          this.newcita.paciente = this.paciente.nombre;

                          console.log(this.newcita);

                          this.store.agregar(this.newcita, "Citas");

                          const alert2 = await this.alertcontroller.create({
                            header: "Cita agregado",
                          });

                          await alert2.present();
                          this.router.navigate(["../home"]);
                        }
                      }
                    });
                  }
                });
            }
          }
        });
      }
    });
  }
}
