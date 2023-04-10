import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Reporte } from 'src/app/models/interface';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  @Input()reporte!: Reporte;
  
  constructor(public menuController: MenuController,) { }

  ngOnInit() {}
 
}
