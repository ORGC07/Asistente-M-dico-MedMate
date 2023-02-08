import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title>
      Medmate
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content padding>
  <form [formGroup]="loginForm">
    <ion-item>
      <ion-label position="fixed">Usuario</ion-label>
      <ion-input formControlName="name"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="fixed">Contraseña</ion-label>
      <ion-input formControlName="password" type="password"></ion-input>
    </ion-item>

    <ion-button expand="block" [disabled]="!loginForm.valid" (click)="login()">Inicio</ion-button>

    <ion-button expand="block" [disabled]="!loginForm.valid" (click)="login()">Registrarse</ion-button>
  </form>
</ion-content>

  `
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log(this.loginForm.value);
    // further processing here
  }
}

