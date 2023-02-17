import { Component, Input, OnInit } from '@angular/core';
import { Reporte } from './../../models';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  @Input()reporte!: Reporte;
  constructor() { }

  ngOnInit() {}

}
