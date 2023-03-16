import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: "app-directorio",
  templateUrl: "./directorio.page.html",
  styleUrls: ["./directorio.page.scss"],
})
export class DirectorioPage implements OnInit {
  constructor( private comp : AppComponent) {}

  ngOnInit() {
    this.comp.menu();
  }

  
}
