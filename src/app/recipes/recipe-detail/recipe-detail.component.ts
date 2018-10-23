import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recette: Recipe ;
  id: number ;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    const id = + this.route.snapshot.params['id'];
    this.recette = this.recipeService.getRecipe(id);

    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recette = this.recipeService.getRecipe(this.id);
        }
    );
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recette.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['modifier'], {relativeTo: this.route});
  }

  OnDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recettes']);
  }
}
