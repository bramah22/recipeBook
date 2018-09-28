import {Recipe} from './recipe.model';
import {EventEmitter, Injectable, INJECTOR} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  // liste des recettes
  private recipes: Recipe[] = [
    new Recipe('recette test' ,
      'juste une recette de test' ,
      'http://www.lesenegal.net/wp-content/uploads/2017/12/maxresdefault-2.jpg',
      [
        new Ingredient('Tomates' , 2),
        new Ingredient('Viande' , 3)
      ]),
    new Recipe('recette test Ndolé' ,
      'juste une recette de test' ,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDs49Km4AlhfCcRhzhdxODU9-T6NtsJBKi9XpMOmhYwQOGbL1Ng',
      [
        new Ingredient('Ognons' , 4),
        new Ingredient('pigments' , 5)
      ])
  ];

  constructor(private slService: ShoppingListService) {}
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  getRecipes() {
    return this.recipes.slice(); // Pour retourner une copie
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.addIngredientsToShoppingList(recipe.ingredients);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
