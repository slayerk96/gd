import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public isLogged: boolean = false;
  public monto;
  public items = 0;
  public data;
  sumadecarrito = 0;
  b; mybool;
  constructor(private router: Router,public authService: AuthService, public fire: FirestoreService, public dialog: MatDialog, private _bottomSheet: MatBottomSheet) {

    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.fire.getPedidos().subscribe((data) => {
        this.fire.pedidosP.length = 0;

        var contador = 0;

        data.forEach((a) => {
          this.b = a.payload.doc.data()['pedido']
          
          if (a.payload.doc.data()['proceso'] == 'preparando') {
            this.fire.pedidosP.push({
              id: a.payload.doc.id,
              data: a.payload.doc.data()
            })
          }
          if (a.payload.doc.data()['proceso'] == 'enviado') {
            this.fire.pedidosP.push({
              id: a.payload.doc.id,
              data: a.payload.doc.data()
            })
          }
          if (a.payload.doc.data()['proceso'] == 'cancelado') {
            this.fire.pedidosP.push({
              id: a.payload.doc.id,
              data: a.payload.doc.data()
            })
          }
          if (a.payload.doc.data()['proceso'] == 'finalizado') {
            this.fire.pedidosP.push({
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

          contador++
          if (contador == data.length) {
            this.fire.pedidosP = this.fire.pedidosP.sort((a, b) => {
              if (a.data.f > a.data.f) {
                return 1;
              }
              if (a.data.f < b.data.f) {
                return -1;
              }
              return 0;
            }).reverse()

          }
        })
      })
    }

    this.isLogged = this.authService.isLoggedIn;
    this.monto = this.authService.monto1;
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.fire.getCarrito().subscribe((data) => {
        this.fire.datosuser=data.payload.data();
        localStorage.setItem('datosuser', JSON.stringify(this.fire.datosuser));
        JSON.parse(localStorage.getItem('datosuser'));
        this.data = data.payload.data();
        var a = data.payload.data()['carrito'];
        this.fire.carrito = a;
        this.items = Object.keys(data.payload.data()['carrito']).length;
        if (this.items > 0) {
          this.fire.bandcarrito = true;
        } else {
          this.fire.bandcarrito = false;
        }
        var productos = new Object();
        this.fire.getProductos().subscribe((prod) => {
          var cont = 0;
          prod.forEach((data) => {
            productos[data.payload.doc.id] = data.payload.doc.data();
            cont = cont + 1;
            if (cont == Object.keys(prod).length) {
              this.sumadecarrito = 0;
              this.fire.sumadecarrito = 0;
              this.fire.resumencarrito.length = 0;
              for (var i in a) {
                this.sumadecarrito = Math.round((parseFloat(productos[i]['precio']) * a[i] + this.sumadecarrito) * 100) / 100;
                this.fire.sumadecarrito = this.sumadecarrito;
                this.fire.resumencarrito.push({
                  cantidad: a[i], total: Math.round((parseFloat(productos[i]['precio']) * a[i]) * 100) / 100, nombre: productos[i]['nombre']
                });
              }
            }
          })
        })
      })
    }


  }
  openBottomSheet(): void {
    this._bottomSheet.open(Pedidos);
  }
  openDialog() {
    const dialogRef = this.dialog.open(Perfil);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result == true) {
      }
    });
  }
  openCvacio() {
    if(this.sumadecarrito==0){
      const dialogRef = this.dialog.open(Cvacio);

      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
        if (result == true) {
        }
      });
    }else{
      location.hash='#carrito'
    }
  }

  ngOnInit(): void {
      if(this.router.url === '/admin'){
        this.mybool=false;
      }else{
        this.mybool=true;
      }

  }

}
@Component({
  selector: 'app-p',
  templateUrl: 'perfil.html',
})
export class Perfil {
  constructor(public fire: FirestoreService) {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.fire.getCarrito().subscribe((data) => {
        this.gnombre = data.payload.data()['displayName']
        this.gcelular = data.payload.data()['celular']
      })
    }
  }

  public editar = false;
  nombre; celular; gnombre; gcelular;
  setN(event) {
    this.nombre = event.target.value;
  }
  setT(event) {
    this.celular = event.target.value;
  }
  edit() {
    this.editar = true;
  }
  fireEditar() {
    this.editar = false;
    this.fire.actualizaCarrito({ displayName: this.nombre, celular: this.celular })
  }
}

@Component({
  selector: 'app-pedidos',
  templateUrl: 'pedidos.html',
  styleUrls: ['./menu.component.scss']
})
export class Pedidos {
  constructor(private _bottomSheetRef: MatBottomSheetRef<Pedidos>, public fire: FirestoreService,private _bottomSheet: MatBottomSheet) { }
  cancelar(id){
    this._bottomSheetRef.dismiss();
    this._bottomSheet.open(Pedidos);

    this.fire.actualizaPedido(id,{proceso:'cancelado'})
  }

  /*openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }*/

}
@Component({
  selector: 'app-cvacio',
  templateUrl: 'carritovacio.html',
})
export class Cvacio {
  constructor() {
  }
}