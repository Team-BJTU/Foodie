var mongoose = require("mongoose");
var dbModels = {};

dbModels.Users = mongoose.model("user", mongoose.Schema({
	name: String,
	password: String,
	mail: String,
	birthDate : Date,
	sexe: { type: String, default : "" },
	date_created : { type : Date, default : Date.now },
	date_updated: { type: Date, default: Date.now }
}));

dbModels.Restaurants = mongoose.model("restaurant", mongoose.Schema({
	name: String,
	mail: String,
	phone: Number,
	adress: String,
	city: String,
	country: String,
	nbSeat: Number,
	description: String,
	user_id: String,
	date_created : { type : Date, default : Date.now },
	date_updated: { type: Date, default: Date.now }
}));

dbModels.Reservations = mongoose.model("reservation", mongoose.Schema({
	restaurant_id: String,
	user_id: String,
	nbPeople: Number,
	date: Date,
	validated: Boolean,
	date_created : { type : Date, default : Date.now },
	date_updated: { type: Date, default: Date.now }
}));

dbModels.Meals = mongoose.model("meal", mongoose.Schema({
	name: String,
	price: Number,
	description: String,
	mark: Number,
	restaurant_id: Number,
	category_id: Number,
	date_created : { type : Date, default : Date.now },
	date_updated: { type: Date, default: Date.now }
}));

dbModels.Categories = mongoose.model("category", mongoose.Schema({
	name: String
}));

dbModels.Pictures = mongoose.model("picture", mongoose.Schema({
	type: String,
	name: String,
	path: String,
	target_id: String,
	date_created : { type : Date, default : Date.now },
}));

dbModels.Momentums = mongoose.model("momentum", mongoose.Schema({
	user_id: String,
	restaurant_id: String,
	title: String,
	content: String,
	mark: Number,
	date: { type: Date, default: Date.now }
}));

dbModels.MealTags = mongoose.model("mealTag", mongoose.Schema({
	momentum_id: String,
	meal_id: String,
	user_id: String
}));