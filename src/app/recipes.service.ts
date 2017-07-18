import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';
import { ShoppingList } from './shoppingList';

@Injectable()
export class RecipesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private recipesUrl = 'api/recipes';
  private shoppingListUrl = 'api/shoppingList';


  constructor(private http: Http) { }

  getAllRecipes(): Observable<Recipe[]> {
	  return this.http
                .get(this.recipesUrl)
                .map(response => {
                  return response.json() as Recipe[]
                })
                //.catch(this.handleError);
  }

  /*getOneRecipe(id): Observable<Recipe> {
    return this.http
                .get(this.recipesUrl)
                .map(response => {
                  return response.json() as Recipe
                })
  }*/

  createRecipe(url: string): Observable<Recipe> {
    return this.http
      .post(this.recipesUrl, JSON.stringify({url: url}), {headers: this.headers})
      .map(response => response.json().data as Recipe)
      //.catch(this.handleError);
  }

  addIngredientsfromRecipe(ingredients: Array<any>): Observable<any> {
    return this.http
    .post(this.shoppingListUrl, JSON.stringify(ingredients), {headers:this.headers})
    .map(response => response.json().data as ShoppingList)
  }

  private handleError (error: Response | any) {
    console.log("error:");
  }
}
