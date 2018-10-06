import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Livre de Recettes';

  pageCharger = 'recipe' ;

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB7QfyT6_4TmLHvv5T-ikGZ0_T-9kw55ns',
      authDomain: 'ng-recipe-book-1cc8d.firebaseapp.com',
    });
  }

  onNavigate(pageSelect: string) {
      this.pageCharger = pageSelect;
  }
}
