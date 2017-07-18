import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { ShoppingList } from '../shoppingList'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  shoppingList: ShoppingList;

  constructor(
    private shoppingListService: ShoppingListService) { }

  getShoppingList(): void {
  	this.shoppingListService
  		.getTotalShoppingList()
      	.subscribe(shoppingList => {
      		this.shoppingList = shoppingList;
    	});
  	};
  
  addIngredient(name: String, quantity: Number): void {
  	this.shoppingListService
  		.addIngredient(name, quantity)
  		.subscribe(shoppingList => {
        	this.shoppingList = shoppingList;
      });
  };

  ngOnInit(): void {
    this.getShoppingList()
  }
}