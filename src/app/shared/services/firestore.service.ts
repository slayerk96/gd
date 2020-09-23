import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    public user: AuthService
  ) {}
  public nuevoPedido(data: { direccion: string, estado: string, proceso: string, total: string, usuario: string, items: any }) {
    return this.firestore.collection('pedidos').add(data);
  }
  public datosuser=this.user.datosuser;
  public carrito;
  public resumencarrito = [];
  public sumadecarrito = 0;
  bandcarrito = false;
  pedidosP=[];
  admP=[];
  nAdmP=[];
  admPr=[];
  nAdmPr=[];
  public setPedido(data) {
    return this.firestore.collection('pedidos').add(data);
  }
  public getPedidos() {
    if (this.user.userData != null) {
      return this.firestore.collection('pedidos', ref => ref.where('usuario', '==', this.user.userData.uid)).snapshotChanges();
    } else {
      return this.firestore.collection('pedidos', ref => ref.where('usuario', '==', JSON.parse(localStorage.getItem('user'))['uid'])).snapshotChanges();
    }
  }
  public admPedidos() {
    if (this.datosuser['local'] != null) {
      return this.firestore.collection('pedidos', ref => ref.where('local', '==', this.datosuser['local'])).snapshotChanges();
    } else {
      return this.firestore.collection('pedidos', ref => ref.where('local', '==', JSON.parse(localStorage.getItem('datosuser'))['local'])).snapshotChanges();
    }
  }
  public getCarrito() {
    if (this.user.userData != null) {
      return this.firestore.collection('users').doc(this.user.userData.uid).snapshotChanges();
    }
    else {
      return this.firestore.collection('users').doc(JSON.parse(localStorage.getItem('user'))['uid']).snapshotChanges();
    }
  }
  public actualizaCarrito(data: any) {
    if (this.user.userData != null) {
      return this.firestore.collection('users').doc(this.user.userData.uid).update(data);
    }
    else {
      return this.firestore.collection('users').doc(JSON.parse(localStorage.getItem('user'))['uid']).update(data);
    }
  }
  public actualizaPedido(documentId: string, data: any) {
    return this.firestore.collection('pedidos').doc(documentId).update(data);
  }
  public getProductos() {
    return this.firestore.collection('productos').snapshotChanges();
  }
}