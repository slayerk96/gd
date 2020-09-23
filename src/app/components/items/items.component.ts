import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuComponent } from '../menu/menu.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {


  public hola = [{ a: 5, b: 6 }, 3]
  public productos = [];
  public agregados = [];
  public bebidas = [];
  existe = new Object();
  num; value = new Object();

  constructor(public firestoreService: FirestoreService, public authService: AuthService, public dialog: MatDialog) {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.firestoreService.getCarrito().subscribe((data) => {
        var a = data.payload.data()['carrito']
        this.existe = new Object();
        for (var item in a) {
          this.value[item] = a[item];
          if (a[item] > 0) {
            this.existe[item] = true
          }
        }
      })
    }
  }
  menos(uid) {
    var a = this.firestoreService.carrito;

    if (a[uid] > 0) {

      for (var item in a) {
        if (item == uid) {
          a[uid] = a[uid] - 1;
          if (a[uid] == 0) {
            this.existe[uid] = false;
            delete a[uid];
            this.firestoreService.actualizaCarrito({ carrito: a });
          } else {
            this.firestoreService.actualizaCarrito({ carrito: a });
          }

        }
      }
    }

  }
  number(event: any, uid) {

    this.num = Math.round((parseFloat(event.target.value) + Number.EPSILON) * 100) / 100;
    if (this.num < 0) {
      event.target.value = 1;
      this.num = 1
      var a = this.firestoreService.carrito;
      a[uid] = this.num;
      this.firestoreService.actualizaCarrito({ carrito: a });
    } else if (this.num == 0) {
      var a = this.firestoreService.carrito;
      this.existe[uid] = false;
      delete a[uid];
      this.firestoreService.actualizaCarrito({ carrito: a });
    } else {
      var a = this.firestoreService.carrito;
      a[uid] = this.num;
      this.firestoreService.actualizaCarrito({ carrito: a });
    }


  }
  prueba() {
  }
  anadirCarrito(uid) {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      var a = this.firestoreService.carrito;
      for (var item in a) {
        if (item == uid) {
          a[uid] = a[uid] + 1;
          this.firestoreService.actualizaCarrito({ carrito: a });
        }
      }
      if (a[uid] == undefined) {
        a[uid] = 1;
        this.firestoreService.actualizaCarrito({ carrito: a });
      }
    } else {
      const dialogRef = this.dialog.open(NoAuth);

      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
        if (result == true) {
        }
      });
    }

  }

  ngOnInit(): void {

    this.firestoreService.getProductos().subscribe((productossnap) => {
      this.productos = [];
      this.agregados = [];
      this.bebidas = [];
      productossnap.forEach((datos: any) => {
        if (datos.payload.doc.data().categoria == "principal") {
          this.productos.push(
            {
              categoria: datos.payload.doc.id,
              data: datos.payload.doc.data(),
            }
          );
        } else if (datos.payload.doc.data().categoria == "agregado") {
          this.agregados.push(
            {
              categoria: datos.payload.doc.id,
              data: datos.payload.doc.data(),
            }
          );
        } else {
          this.bebidas.push(
            {
              categoria: datos.payload.doc.id,
              data: datos.payload.doc.data(),
            }
          );
        }

      })
    })
  }

}
@Component({
  selector: 'app-noauth',
  templateUrl: 'noauth.html',
})
export class NoAuth {
  constructor() {
  }
}