import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

  constructor( private comp: AppComponent) { }

  ngOnInit() {
    this.comp.menu();
  }

}
