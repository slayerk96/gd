import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, firebaseConfig } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComofuncionaComponent } from './components/body/comofunciona/comofunciona.component';
import { PrincipalComponent } from './components/body/principal/principal.component';
import { MenuComponent, Perfil, Pedidos, Cvacio} from './components/menu/menu.component';

import { AngularFireModule } from '@angular/fire';
import { ItemsComponent, NoAuth } from './components/items/items.component';

import {MatButtonModule} from '@angular/material/button';

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './shared/routing/app-routing.module';
import { AuthService } from './shared/services/auth.service';


import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { CarritoComponent, DialogContentExampleDialog, FDatos } from './components/carrito/carrito.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


import {MatInputModule} from '@angular/material/input';
import { StreamComponent } from './components/stream/stream.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import {MatExpansionModule} from '@angular/material/expansion';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdminComponent } from './components/admin/admin.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    ComofuncionaComponent,
    PrincipalComponent,
    MenuComponent,
    ItemsComponent,
    CarritoComponent,
    StreamComponent,
    DialogContentExampleDialog,
    Perfil,
    Pedidos,
    Cvacio,
    NoAuth,
    FDatos,
    AdminComponent
  ],
  exports:[
  ],
  imports: [
    MatTabsModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
