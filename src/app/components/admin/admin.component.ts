import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public b; nPedidos;nPedidosr; band = true;bandr = true;
  constructor(public fire: FirestoreService) {

    if (JSON.parse(localStorage.getItem('user')) != null) {

      this.fire.admPedidos().subscribe((data) => {
        var contador = 0;
        this.fire.admP.length = 0;
        this.fire.admPr.length = 0;
        data.forEach((a) => {
          console.log(a.payload.doc.data()['pedido'])
          this.b = a.payload.doc.data()['pedido']
          if (a.payload.doc.data()['fechae'] == ""||a.payload.doc.data()['eListo']==true||a.payload.doc.data()['proceso']=='cancelado'||a.payload.doc.data()['proceso']=='enviado'||a.payload.doc.data()['proceso']=='finalizado') {
            if (a.payload.doc.data()['proceso'] == 'preparando') {
              this.fire.admP.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
            if (a.payload.doc.data()['proceso'] == 'enviado') {
              this.fire.admP.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
            if (a.payload.doc.data()['proceso'] == 'cancelado') {
              this.fire.admP.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
            if (a.payload.doc.data()['proceso'] == 'finalizado') {
              this.fire.admP.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
            if (a.payload.doc.data()['proceso'] == 'contabilizado') {
              this.fire.admPr.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
          } else {
            if (a.payload.doc.data()['proceso'] == 'preparando') {
              this.fire.admPr.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
            if (a.payload.doc.data()['proceso'] == 'enviado') {
              this.fire.admPr.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
            if (a.payload.doc.data()['proceso'] == 'cancelado') {
              this.fire.admPr.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
            if (a.payload.doc.data()['proceso'] == 'finalizado') {
              this.fire.admPr.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
            if (a.payload.doc.data()['proceso'] == 'contabilizado') {
              this.fire.admPr.push({
                id: a.payload.doc.id,
                data: a.payload.doc.data()
              })
            }
          }
          contador++
          if (contador == data.length) {
            this.fire.admP = this.fire.admP.sort((a, b) => {
              if (a.data.f > a.data.f) {
                return 1;
              }
              if (a.data.f < b.data.f) {
                return -1;
              }
              return 0;
            }).reverse();
            if (this.band == true || this.fire.admP.length == this.fire.nAdmP.length) {
              this.fire.nAdmP = this.fire.admP.slice();
              this.band = false;
            }
            this.nPedidos = this.fire.admP.length - this.fire.nAdmP.length;
          }
          if (contador == data.length) {
            this.fire.admPr = this.fire.admPr.sort((a, b) => {
              if (a.data.f > a.data.f) {
                return 1;
              }
              if (a.data.f < b.data.f) {
                return -1;
              }
              return 0;
            }).reverse();
            if (this.bandr == true || this.fire.admPr.length == this.fire.nAdmPr.length) {
              this.fire.nAdmPr = this.fire.admPr.slice();
              this.bandr = false;
            }
            this.nPedidosr = this.fire.admPr.length - this.fire.nAdmPr.length;
          }

        })
      })
    }


  }
  aPedidos() {
    this.fire.nAdmP = this.fire.admP;
    this.fire.nAdmPr = this.fire.admPr;
    this.nPedidos = this.fire.admP.length - this.fire.nAdmP.length;
    this.nPedidosr = this.fire.admPr.length - this.fire.nAdmPr.length;
  }
  change(event: MatSelectChange, id) {
    if (event.value == 'listo') {
      this.fire.actualizaPedido(id, { eListo: true, proceso: 'preparando', hpago: null})
    } else if(event.value == 'finalizado') {
      var hp=new Date();
      this.fire.actualizaPedido(id, { eListo: false, proceso: 'finalizado', hpago: hp})
    } else{
      this.fire.actualizaPedido(id, { eListo: false, proceso: event.value, hpago: null })
    }
    this.band = true;
  }
  ngOnInit(): void {
  }

}
