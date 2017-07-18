var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
	name: String,
	id: Number,
	ingredients: [{
		name: String,
		quantity: Number
	}],
	tags: Array
});

mongoose.model('Recipe', recipeSchema);
