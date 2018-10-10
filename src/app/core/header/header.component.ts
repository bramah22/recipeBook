import {Component} from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStoreService: DataStorageService,
              private authService: AuthService) {}
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
    this.authService.logOut();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
