import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';

import { RecipesService } from './recipes.service';
import { ShoppingListService } from './shopping-list.service';

import { RecipesComponent } from './recipes/recipes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component'

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    DashboardComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'dash',
        pathMatch: 'full'
      },
      {
        path: 'recipes',
        component: RecipesComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'shoppingList',
        component: ShoppingListComponent
      }
    ])
  ],
  providers: [RecipesService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
