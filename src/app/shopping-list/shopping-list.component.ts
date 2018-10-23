import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import {Ingredient} from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromAPp from '../store/app.reducers';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState: Observable<fromAPp.AppState> ;

  constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.pipe(select('shoppingList'));
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
