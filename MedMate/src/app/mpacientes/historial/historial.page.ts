import { Component, OnInit } from '@angular/core';
import { __setFunctionName } from 'tslib';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    console.log("funciona")
  }

}
