import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  // liste des recettes
  recipes: Recipe[] = [];

  recipesSubscription: Subscription;
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSubscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

  onNewRecipe() {
    this.router.navigate(['nouvelle'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }
}
