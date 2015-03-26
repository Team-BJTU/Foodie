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
	name: {type: String, required: true},
	mail: {type: String, required: true},
	phone: { type: Number, required: true},
	adress: {type: String, required: true},
	city: {type: String, required: true},
	zipcode: {type: Number, required: true},
	country: {type: String, required: true},
	nbSeat: Number,
	description: String,
	user_id: {type: String, required: true},
	category_restaurant_id: String,
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
	name: { type: String, required: true},
	price: { type: Number, required: true},
	description: String,
	mark: Number,
	restaurant_id: { type: Number, required: true},
	category_meal_id: { type: Number, required: true},
	date_created : { type : Date, default : Date.now },
	date_updated: { type: Date, default: Date.now }
}));

dbModels.MealCategories = mongoose.model("mealCategory", mongoose.Schema({
	name: { type: String, required: true}
}));

dbModels.RestaurantCategories = mongoose.model("restaurantCategory", mongoose.Schema({
	name: { type: String, required: true}
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