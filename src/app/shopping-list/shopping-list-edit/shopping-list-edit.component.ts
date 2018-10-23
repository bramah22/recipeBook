import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';


import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  editMode =  false ;
  editedIngredient: Ingredient;
  subscription: Subscription;

  @ViewChild('f') slForm: NgForm ;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.pipe(select('shoppingList'))
      .subscribe(
        (data) => {
          if (data.editedIngredientIndex > -1) {
            this.editMode = true;
            this.editedIngredient = data.editedIngredient;
            this.slForm.setValue({
              name: this.editedIngredient.name,
              amount: this.editedIngredient.amount
            });
          } else {
            this.editMode = false;
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false ;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}

