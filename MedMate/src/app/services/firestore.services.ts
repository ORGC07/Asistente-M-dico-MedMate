import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore) {}
  createRepo(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }
  getRepo( path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }
  deletetRepo( path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }
  updateRepo(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }
  getId(){
   return this.database.createId();
  }
  getCollection<tipo>(path: string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }
}
