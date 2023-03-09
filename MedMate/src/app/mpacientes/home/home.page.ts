import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonFooter } from '@ionic/angular';
import { medicacion } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  infom: medicacion ={ 
    medicamento: "",
    cdias : 0,
    fecha : "",
    hora: 0,
    userid: "",
  };
  drugs: any[] = [];
  uid: any;
  

  constructor(private router: Router, private auth: AuthService, private store: FirestoreService) {
    
  }    

  async ngOnInit() {
    
    const uid = await this.auth.getUid()
    if (uid){
      this.uid = uid;
      this.medicamentos();}
    
  }

  medicamentos(){
    const path = "Medicamentos"
    this.store.consultar<medicacion>(path).subscribe(res => {
      if(res){
        this.drugs = []
        res.forEach( r => {
          if(r){
            this.infom = r
            this.drugs.push(this.infom),
            console.log(this.drugs)
           }
          })

         
      }
    })
  }
}

