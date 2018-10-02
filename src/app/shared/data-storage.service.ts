import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {


  FIREBASE_URL = 'https://ng-recipe-book-1cc8d.firebaseio.com/';

    constructor(private http: Http,
                private recipeService: RecipeService) {}


    storeRecipes() {
        return this.http.put(this.FIREBASE_URL + 'recettes.json', this.recipeService.getRecipes());
    }

    fetchDate() {
        this.http.get(this.FIREBASE_URL + 'recettes.json')
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

