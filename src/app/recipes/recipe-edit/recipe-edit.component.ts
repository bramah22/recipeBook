import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number ;
  editMode = false ;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  initForm() {
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeName = '';
    const recipeIngredients = new FormArray([]) ;

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath ;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          const newIngredientControl = new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            });
          recipeIngredients.push(newIngredientControl);
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath , Validators.required),
      'description': new FormControl(recipeDescription , Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    const ingredientCtrl = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null , [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      });
    (<FormArray>this.recipeForm.get('ingredients')).push(ingredientCtrl);
  }

  onSubmit() {
    const recipeValue = this.recipeForm.value;
    const newRecipe = new Recipe(recipeValue['name'],
        recipeValue['description'],
        recipeValue['imagePath'],
        recipeValue['ingredients']);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id , recipeValue);
    } else {
      this.recipeService.addRecipe(recipeValue);
    }
    this.onCancel();
  }

  // Annulation de la modification ou de la création
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
