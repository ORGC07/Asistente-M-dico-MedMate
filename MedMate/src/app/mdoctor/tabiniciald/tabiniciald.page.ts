import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.services';

@Component({
  selector: 'app-tabiniciald',
  templateUrl: './tabiniciald.page.html',
  styleUrls: ['./tabiniciald.page.scss'],
})
export class TabinicialdPage implements OnInit {
  

  constructor( private auth: AuthService, private router: Router,
    private store: FirestoreService, private comp: AppComponent) { }

  ngOnInit() {
  }

  async cerrar(){
    await this.auth.cerrars
    console.log("Cerrado")
    this.router.navigate(['./login']);
    }
  
    setreportes(){
      this.router.navigate(['./set-reportes'])
    }

  menu(){
    console.log("entro1")
    this.comp.menu()

  }

}
