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

  agregar(data: any, path: string){

    const collection = this.firestore.collection(path);
    return collection.doc().set(data)
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

  deletedoc(path:string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }

  async update<Tipo>(path: string, id:string, data: any){
    return await this.firestore.collection<Tipo>(path).doc(id);
  }
}
