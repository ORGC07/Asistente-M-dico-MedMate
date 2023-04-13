import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from "src/app/services/firestore.service";
import { cita, doctor, paciente } from "src/app/models/interface";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Time } from "@angular/common";

@Component({
  selector: "app-directorio",
  templateUrl: "./directorio.page.html",
  styleUrls: ["./directorio.page.scss"],
})
export class DirectorioPage implements OnInit {
  pathpaciente = "Pacientes";
  pathdoctor = "Doctores";
  uidpaciente: any;
  uiddoctor: any;
  infodoctor: doctor[] = [];
  doctores2: doctor[] = [];
  pacientes: paciente[] = [];

  doctor2: doctor = {
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
    id: this.store.getId(),
    estado: "",
  };

  doctores: any[] = [];
  uid: any;
  infod: doctor = {
    uid: "",
    nombre: "",
    apellido: "",
    cedula: "",
    especialidad: "",
    correo: "",
    contraseña: "",
    rol: "Doctor",
  };

  constructor(
    private comp: AppComponent,
    private auth: AuthService,
    private router: Router,
    private store: FirestoreService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.comp.menu();
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      this.doctor();
    }
  }
  async presentAlertPrompt(doct: doctor) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Agendar cita",
      subHeader: "Dr. " + doct.nombre + " " + doct.apellido,
      inputs: [
        {
          name: "fecha",
          type: "date",
          placeholder: "Fecha",
        },
        {
          name: "hora",
          type: "time",
          placeholder: "Hora",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Aceptar",
          handler: async (eve) => {
            if(eve){
              this.savecita(
                doct.nombre,
                doct.apellido,
                doct.uid,
                doct.especialidad,
                eve.fecha,
                eve.hora
              );
            }
            else{
              const alert = await this.alertController.create({
                header: "Datos incompletos",
                message: "Debe de ingresar todos los campos",
              });

              await alert.present();
              return;
            }
            
          },
        },
      ],
    });

    await alert.present();
  }

  async savecita(dnombre: string, dapellido: string, duid: string, despecialidad: string,fecha: Date, hora: number) {
    const uid = await this.auth.getUid();

    let citaCreada = false;

    this.uidpaciente = uid;
    this.store.consultar<paciente>(this.pathpaciente).subscribe((pac) => {
      if (pac) {
        this.pacientes = pac;
        this.pacientes.forEach(async (pac2) => {
          if (pac2.uid == this.uidpaciente) {
            this.paciente = pac2;
            if (!citaCreada) {
              this.newcita.doctor =
                dnombre + " " + dapellido;
              this.newcita.especialidad = despecialidad;
              this.newcita.fecha = fecha;
              this.newcita.hora = hora;
              this.newcita.iddoctor = duid;
              this.newcita.idpaciente = this.uidpaciente;
              this.newcita.paciente =
                this.paciente.nombre + " " + this.paciente.apellido;
              this.newcita.id = this.store.getId();
              this.newcita.estado = "En espera";

              console.log(this.newcita);

              this.store.createDoc(this.newcita, "Citas", this.newcita.id);

              citaCreada = true;

              const alert2 = await this.alertController.create({
                header: "Cita agregada",
              });

              await alert2.present();
              this.router.navigate(["../home"]);
            }
          }
        });
      }
    });
  }

  doctor() {
    const path = "Doctores";
    this.store.consultar<doctor>(path).subscribe((res) => {
      if (res) {
        this.doctores = [];
        res.forEach((r) => {
          this.infod = r;
          this.doctores.push(this.infod), console.log(this.doctores);
        });
      }
    });
  }

  acita() {
    this.router.navigate(["../a-citas"]);
  }
}
