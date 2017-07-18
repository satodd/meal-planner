const express = require('express');
const router = express.Router();
const https = require('https');
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const ShoppingList = mongoose.model('ShoppingList');
const Calender = mongoose.model('Calender');

var recipesControllers = require('../../controllers/recipes');
var shoppingListControllers = require('../../controllers/shoppinglist');


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works~');
});

//get all recipes from db
router.get('/recipes', recipesControllers.getRecipes);

//add recipe from pinterest
router.post('/recipes', recipesControllers.addRecipePinterest);

//get specific recipe from db
router.get('/recipes/:id', recipesControllers.getRecipe);

//get a monthly calender 
router.get('/calendar', (request, response) => {
  response.send("calendar")
});

//get shoppingList from db
router.get('/shoppingList', shoppingListControllers.getShoppingList);

//add ingredients to shopping list
router.post('/shoppingList', shoppingListControllers.addtoShoppingList);

module.exports = router;
