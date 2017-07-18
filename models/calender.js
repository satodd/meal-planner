const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

var calenderSchema = new mongoose.Schema({
	days: [{
		date: String,
		meals:[{
			recipe: Array
		}]
	}]
});

mongoose.model('Calender', calenderSchema);
