import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ShoppingList } from './shoppingList';

@Injectable()
export class ShoppingListService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private shoppingListUrl = 'api/shoppingList';

  constructor(private http: Http) { }

  getTotalShoppingList(): Observable<ShoppingList> {
	  return this.http
                .get(this.shoppingListUrl)
                .map(response => {
                  return response.json() as ShoppingList
                })
                //.catch(this.handleError);
  }

  addIngredient(name: String, quantity: Number): Observable<ShoppingList> {
  	return this.http
  	.post(this.shoppingListUrl, JSON.stringify({name: name, quantity: quantity}), {headers:this.headers})
  	.map(response => response.json().data as ShoppingList)
  }
}
