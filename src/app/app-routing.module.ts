import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    { path: '' , redirectTo: '/recettes', pathMatch: 'full'},
    { path: 'recettes' , component: RecipesComponent,
        children: [
            { path: '' , component : RecipeStartComponent},
            { path: 'nouvelle' , component : RecipeEditComponent},
            { path: ':id' , component : RecipeDetailComponent},
            { path: ':id/modifier' , component : RecipeEditComponent}
        ]
    },
    { path: 'liste-achat' , component: ShoppingListComponent}
];
@NgModule({
    imports: [ RouterModule.forRoot(appRoutes)],
    exports: [ RouterModule]
})
export class AppRoutingModule {

}

