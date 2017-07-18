let https = require('https');
let mongoose = require('mongoose');
let ShoppingList = mongoose.model('ShoppingList');

exports.getShoppingList = function(request, response) {
	ShoppingList.findOne({id:1}, function (err, shoppingList) {
    	return response.jsonp(shoppingList)
 	});
};

exports.addtoShoppingList = function(request, response) {
	ShoppingList.findOne({id:1}, function (err, shoppingList) {
		if (shoppingList){
			var ingredients = shoppingList.ingredients.concat(request.body)
			shoppingList.ingredients = ingredients;
			mongoose.model("ShoppingList").update({id:1}, {ingredients:ingredients}, function (err, updatedShoppingList) {
				if (err) response.send("There was a db````` problem");
			});
			return response.jsonp(shoppingList)
		} else {

			mongoose.model('ShoppingList').create({
		        	id: 1,
					name: "Shopping List",
					ingredients: request.body
		    }, function (err, newShoppingList) {
		        if (err) response.send("There was a db````` problem");
		        return response.jsonp(newShoppingList);
			});
		};
	});
}
