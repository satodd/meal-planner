import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ShoppingListService } from '../shopping-list.service';
import { Recipe } from '../recipe'
import { ShoppingList } from '../shoppingList'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  recipe: Recipe;
  selectedRecipe: Recipe;
  shoppingList: ShoppingList;
  shoppingListService: ShoppingListService;

  constructor(
    private recipesService: RecipesService) {}


  getRecipes(): void {
    this.recipesService
    .getAllRecipes()
    .subscribe(recipes => {
      this.recipes = recipes;
      console.log(recipes)
    });
  }

  /*getRecipe(id): void {
    this.recipesService
    .getOneRecipe(id)
    .subscribe(recipe => {
      this.recipe = recipe
    });
  }*/

  addRecipe(url: string): void {
    url = url.trim();
    if (!url) { return; }
    this.recipesService.createRecipe(url)
      .subscribe(
        recipe => {
          this.recipes.push(recipe);
          this.selectedRecipe = null;
          //this.selectedRecipe = null;
        }
      );
  }

  addIngredientsToShoppingList(ingredients: Array<any>): void {
    console.log(ingredients);
    this.recipesService
      .addIngredientsfromRecipe(ingredients)
      .subscribe();
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  onSelect(recipe: Recipe): void {
    if (this.selectedRecipe) {
      this.selectedRecipe = null;
    } else {
      this.selectedRecipe = recipe;
    }
  }
}
