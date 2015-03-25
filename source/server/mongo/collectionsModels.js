var mongoose = require("mongoose");
var dbModels = {};

dbModels.Users = mongoose.model("user", mongoose.Schema({
	username: {type : String, required: true},
 	password: {type : String, required : true},
	mail: {type : String, required : true},
	birthDate : {type : Date, required : true},
	city : {type : String, required : true},
	last_long : Number,
	last_lat : Number,
	is_active : {type :Boolean, default : true},
	is_admin : Boolean,
	picture_path : String,
	sexe: { type: String, default : "M" },
	last_login: { type : Date, default : Date.now}, 
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
	name: String,
	price: Number,
	description: String,
	mark: Number,
	restaurant_id: Number,
	category_meal_id: Number,
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
	name: {type : String, required: true},
	path: {type : String, required: true},
	size: {type: Number, required: true},
	target_id: {type : String, required: true},
	target_type: {type: String, required: true},
	user_id : {type: String, required: true},
	date_created : { type : Date, default : Date.now },
}));

dbModels.Momentums = mongoose.model("momentum", mongoose.Schema({
	user_id: { type : String, required : true},
	restaurant_id: { type : String, required : true},
	title: { type : String, required : true},
	content: { type : String, required : true},
	mark: { type : Number, required : true},
	date: { type : Date, default: Date.now }
}));

dbModels.MealTags = mongoose.model("mealTag", mongoose.Schema({
	momentum_id: { type : String, required : true},
	meal_id: { type : String, required : true},
	user_id: { type : String, required : true},
}));

module.exports = dbModels;