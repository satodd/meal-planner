var mongoose = require('mongoose');
//localbd here 
var url = "";

mongoose.connect(url);

// load all models
require('../models/recipe');
require('../models/calender');
require('../models/shoppinglist');