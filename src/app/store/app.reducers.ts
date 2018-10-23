import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
}


// La liste de tous les reducers de l'application qu'on va importer dans appModule

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.ShoppingListReducer,
    auth: fromAuth.AuthReducer
};
