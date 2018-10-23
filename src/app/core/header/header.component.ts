import {Component, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private dataStoreService: DataStorageService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.pipe(select('auth'));
  }

  onStore() {
    this.dataStoreService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onFetchData() {
    this.dataStoreService.fetchDate();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
