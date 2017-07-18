export class Recipe {
	name: String;
	id: Number;
	ingredients: [{
		name: String;
		quantity: Number
	}];
	tags: Array<String>
}