import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {


  FIREBASE_URL = 'https://ng-recipe-book-1cc8d.firebaseio.com/';

    constructor(private http: Http,
                private recipeService: RecipeService,
                private authService: AuthService) {}


    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put(this.FIREBASE_URL + 'recettes.json?auth=' + token, this.recipeService.getRecipes());
    }

    fetchDate() {
        const token = this.authService.getToken();
        this.http.get(this.FIREBASE_URL + 'recettes.json?auth=' + token)
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe.ingredients = [] ;
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
}
}

