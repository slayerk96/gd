import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { MatSelectChange } from '@angular/material/select';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(public fire: FirestoreService,public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
     if(result==true){
      this.setPedido();
      this.fire.actualizaCarrito({carrito:{}});
      this.direccion='';this.pago='';this.numero='';this.fechae='';this.local='';this.fechae1='';this.verfh=false;
     }
    });
  }
  openF() {
    const dialogRef = this.dialog.open(FDatos);

    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
    });
  }
  o(){
    if(this.verfh==true){
      if(this.direccion==''||this.pago==''||this.numero==''||this.fechae==''||this.local==''||this.fechae1==''){
        this.openF()
        console.log('1')
      }else{
        this.openDialog()
      }
    }else{
      if(this.direccion==''||this.pago==''||this.numero==''||this.fechae==''||this.local==''){
        this.openF()
      }else{
        this.openDialog()
      }
    }
    
  }



  public productos=this.fire.resumencarrito;
  public efectivo=false;
  public direccion='';
  public notas='';
  public billete='';
  public pago='';
  public numero='';
  public fechae='';
  public fechae1='';
  public verfh=false;
  public local='';
   
  

  fDireccion(event){
    this.direccion=event.target.value;
    console.log(event.target.value);
    console.log('event')
  }
  fFh(event){
    this.fechae1=event.target.value;
  }
  fNotas(event){
    this.notas=event.target.value;
    console.log(event.target.value);
    console.log('event')
  }
  fNum(event){
    this.numero=event.target.value;
    console.log(event.target.value);
    console.log('event')
  }
  fBillete(event){
    this.billete=event.target.value;
    console.log(event.target.value);
    console.log('event')
  }
  fMetodo(event: MatSelectChange){
    this.fechae=event.value;
    if(event.value=='otro'){
      this.verfh=true
    }else{
      this.verfh=false
    }
  }
  fLocal(event: MatSelectChange){
    this.local=event.value;
  }
  changeRatio(event: MatSelectChange) {
    this.pago=event.value;
    console.log(event.value);
    if(event.value=='efectivo'){
      this.efectivo=true;
    } else{
      this.efectivo=false;
    }
  }
  setPedido(){
    console.log(this.fire.sumadecarrito);
    console.log(this.pago)
    var hoy=new Date();
    var fecha=hoy.getDate()+'-'+(hoy.getMonth()+1)+' '+hoy.getHours()+':'+hoy.getMinutes() ;

    var data={
      f:hoy,
      fecha:fecha,
      numero:this.numero,
      pedido:this.fire.resumencarrito,
      nombre:this.fire.user.userData['displayName'],
      total:this.fire.sumadecarrito,
      direccion:this.direccion,
      proceso:'preparando',
      usuario:this.fire.user.userData['uid'],
      notas:this.notas,
      mpago:this.pago,
      fechae:this.fechae1,
      local:this.local,
      eListo:false,
    };
    return this.fire.setPedido(data);
  }
  ngOnInit(): void {
    setTimeout(function() {
      var f = document.querySelectorAll('iframe')[0];
      f.src = 'https://www.google.com/maps/d/u/0/embed?mid=1yKXRkP6PPOPl6p7QDxCLzKPHehIedbVI';
      }, 2000);
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
@Component({
  selector: 'app-fdatos',
  templateUrl: 'faltandatos.html',
})
export class FDatos {}
