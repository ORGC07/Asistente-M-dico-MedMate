import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  createDoc(data: any, path: string, id:string){

    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data)
  }

  getId(){
    return this.firestore.createId();
  }

  consultar<Tipo>(path: string){
    const collection = this.firestore.collection<Tipo>(path);
    return collection.valueChanges();
  }

  getDoc<Tipo>(path: string, id: string){
    return this.firestore.collection<Tipo>(path).doc(id).valueChanges();
  }
}
