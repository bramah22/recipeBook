import {Component} from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStoreService: DataStorageService) {}
  onStore() {
    this.dataStoreService.storeRecipes()
      .subscribe(
        (response) => {
          console.log('Données enregistrées avec succès');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onFetchData() {
    this.dataStoreService.fetchDate();
  }
}
