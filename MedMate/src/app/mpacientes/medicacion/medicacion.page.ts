import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,
  Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { time } from 'console';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { medicacion, paciente } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-medicacion',
  templateUrl: './medicacion.page.html',
  styleUrls: ['./medicacion.page.scss'],
})
export class MedicacionPage implements OnInit {

  public medicamentoform: FormGroup;

  uid: any;
  info: paciente | undefined;
  newmedicamento: medicacion = {
    medicamento: "",
    cdias : 0,
    fecha : "",
    hora: 0,
    userid: "",
    id: this.store.getId()

  }

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
    private store: FirestoreService, private alertcontroller: AlertController) {

      this.medicamentoform = this.fb.group({
        'medicamento': new FormControl("", Validators.required),
        'cdias': new FormControl("", Validators.required),
        'hora': new FormControl("", Validators.required),
      })
     }

  async ingresar(){
    const uid = await this.auth.getUid()
    if (uid){
      this.uid = uid;
    }

    const path = "Pacientes"
    this.store.getDoc<paciente>(path,this.uid).subscribe(res => {
      if(res){
        this.info = res;
      }
    })

    if (this.info?.uid == this.uid) {
      var f = this.medicamentoform.value;

      if (this.medicamentoform.invalid) {

      const alert = await this.alertcontroller.create({
        header: 'Datos incompletos',
        message: 'Debe de ingresar todos los campos',
      });

      await alert.present();
      return;
    }

    else{

      this.newmedicamento.medicamento = f.medicamento,
      this.newmedicamento.cdias = f.cdias;
      this.newmedicamento.hora = f.hora;
      this.newmedicamento.fecha = '2022-06-03';
      this.newmedicamento.userid = this.uid;
      this.newmedicamento.id= this.store.getId()

      console.log(this.newmedicamento);

      this.store.createDoc(
        this.newmedicamento,
        "Medicamentos",
        this.newmedicamento.id
      );     

      const alert2 = await this.alertcontroller.create({
        header: 'Medicamento agregado',
      });

      await alert2.present();
      this.router.navigate(['../home'])

    }
      
    }

  }

  ngOnInit() {
  }

}
