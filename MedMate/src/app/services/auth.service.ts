import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private create: AngularFirestore) {
    
   }

  login(correo: string, contraseña:string){
    return this.auth.signInWithEmailAndPassword(correo, contraseña)

    }

  registrar(correo: string, contraseña: string){

    return this.auth.createUserWithEmailAndPassword(correo,contraseña)
    
  }

  cerrars(){
    return this.auth.signOut
  }

  async getUid(){
    const user = await this.auth.currentUser;
    return user?.uid

  }
}
