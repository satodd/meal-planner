var mongoose = require('mongoose');

var shoppingListSchema = new mongoose.Schema({
	id: Number,
	name: String,
	ingredients: [{
		name: String,
		quantity: Number
	}]
});

mongoose.model('ShoppingList', shoppingListSchema);
