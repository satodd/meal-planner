let https = require('https');
let mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

const accessToken = 'access_token=AR66sJdjbI3k1CQ8vr0cZ1HBBiScFMaKkXB0HIZD89CrJ6BAwgAAAAA';
const fields = 'metadata%2Cimage'


function extractName(body) {
	var pin = JSON.parse(body);
	return pin.data.metadata.recipe.name
}

function extractID(body) {
	var pin = JSON.parse(body);
	return pin.data.id
}

/*function ingredientsDigDown(ingredientList) {
  var ingredients = [];

  for (var type in ingredientList) {
    if (ingredientList[type].ingredients.length > 1) {
      ingredients = ingredients.concat(ingredientList[type].ingredients);
    } else { 
      ingredients.push(ingredientList[type].ingredients);
    }
  }

  return ingredients
}*/

//Parses out ingredients from json object
function extractIngredients(body) {
	var pin = JSON.parse(body);
	var ingredientList = pin.data.metadata.recipe.ingredients;
  var ingredients = [];

  for (var type in ingredientList) {
    ingredients = ingredients.concat(ingredientList[type].ingredients);
  }

	return ingredients
}

function disectUrl(url) {
  return url.match(/[^/pin/]([1-9])+/g)
}


// Get url, width, height (pixels) of image of recipe
/*function extractPictureURL(body) {
	var pin = JSON.parse(body);
	var url = pin.root.data.image.url;
	var width = pin.root.data.image.height;
	var height = pin.root.data.image.width;

	return [url, width, height]
}*/

//post to /recipe
exports.addRecipePinterest = function(request, response) {
  var pin = disectUrl(request.body.url);

  const options = {
    host: 'api.pinterest.com',
    path: '/v1/pins/' + pin + '/?' + accessToken + '&fields=' + fields
  };

  var req = https.get(options, function(res) {
    var body = ""

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var name = extractName(body);
      var id = extractID(body);
      var ingredients = extractIngredients(body);

      mongoose.model('Recipe').create({
        name: name ,
        id: id ,
        ingredients: ingredients ,
        tags: []
      }, function (err, recipe) {
        if (err) res.send("There was a db````` problem");
        else
          console.log("new recipe added: id = " + id)
      });
      
      response.send(body);      
    });

    req.on('error', function(e) {
      console.log("Error: " + e.message);
    });
  });
}

//get to /recipe
//gets all Recipes from db
exports.getRecipes = function(request, response) {

  Recipe.find({}, function (err, recipes) {
    return response.jsonp(recipes)
  });

}

exports.getRecipe = function(request, response) {

  Recipe.find({id:request.params.id}, function (err, recipe) {
    return response.jsonp(recipe)
  });
}
