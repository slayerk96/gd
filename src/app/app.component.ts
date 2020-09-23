import { Component } from '@angular/core';

export var firebaseConfig = {
  apiKey: "AIzaSyC2ppMlVRKlmBVjN6OyJ6RxK6YQ6ZBCfW0",
  authDomain: "gludelivery.firebaseapp.com",
  databaseURL: "https://gludelivery.firebaseio.com",
  projectId: "gludelivery",
  storageBucket: "gludelivery.appspot.com",
  messagingSenderId: "655221402753",
  appId: "1:655221402753:web:3d09b381f95a0ab47b3180",
  measurementId: "G-FY5N1G19L4"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'delivery';
}
