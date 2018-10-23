import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {


  FIREBASE_URL = 'https://ng-recipe-book-1cc8d.firebaseio.com/';

    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService
                ) {}


    storeRecipes() {
        // const token = this.authService.getToken();
        // return this.httpClient.put(this.FIREBASE_URL + 'recettes.json',
        //             this.recipeService.getRecipes(), {
        //                 observe: 'body',
        //                 params: new HttpParams().set('auth', token)
        //             });

        const req = new HttpRequest('PUT' , this.FIREBASE_URL + 'recettes.json', this.recipeService.getRecipes(),
                        {reportProgress: true });
        return this.httpClient.request(req);
    }

    fetchDate() {
        // const token = this.authService.getToken();
        // this.httpClient.get<Recipe[]>(this.FIREBASE_URL + 'recettes.json?auth=' + token)

        this.httpClient.get<Recipe[]>(this.FIREBASE_URL + 'recettes.json', {
            observe: 'body',
            responseType: 'json'
        }).pipe(
            map(
                (recipes) => {
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe.ingredients = [] ;
                        }
                    }
                    return recipes;
                }
            ))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
}
}

