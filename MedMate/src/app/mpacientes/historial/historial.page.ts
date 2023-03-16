import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { __setFunctionName } from 'tslib';

@Component({
  selector: "app-historial",
  templateUrl: "./historial.page.html",
  styleUrls: ["./historial.page.scss"],
})
export class HistorialPage implements OnInit {
  constructor( private comp: AppComponent) {}

  ngOnInit() {
    this.comp.menu();
  }

  onClick() {
    console.log("funciona");
  }

  
}
