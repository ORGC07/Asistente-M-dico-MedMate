import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paciente } from 'src/app/models/interface';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tabinicialp',
  templateUrl: './tabinicialp.page.html',
  styleUrls: ['./tabinicialp.page.scss'],
})
export class TabinicialpPage implements OnInit {

  info: paciente = null!;
  uid: any;

  constructor(private auth: AuthService, private router: Router,
    private store: FirestoreService) { }

  

  async ngOnInit() {
    
    const uid = await this.auth.getUid()
    if (uid){
      this.uid = uid;
      this.infop();
    }

  }

  infop(){
    const path = "Pacientes"
    this.store.getDoc<paciente>(path,this.uid).subscribe(res => {
      if(res){
        this.info = res;
      }
    })
  }

  async cerrar(){
    this.router.navigate(['./login']);
    await this.auth.cerrars    
    }
    
  medicacion(){
    this.router.navigate(['./medicacion']);
    }

  acita(){
    this.router.navigate(['./a-citas']);
  }

}
