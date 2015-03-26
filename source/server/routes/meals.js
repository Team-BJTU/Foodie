var express = require('express');
var router = express.Router();
var mongoMeal= require("../mongo/mealsMongoMod");

/// POST REQUEST
router.post("/new", function(req, res) {
	mongoMeal.addMeal(req.models, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", Meal: row});
	});
});

/// GET REQUEST

router.get("/all", function(req, res){
	mongoMeal.getAllMeal(req.models.Meals, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", Meal: row});
	});
});

router.get("/id/:meal_id", function(req, res){
	mongoMeal.getMealById(req.models.Meals, req.params.meal_id, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", Meal: row});
	});
});

router.get("/name/:name", function(req, res){
	mongoMeal.getMealByName(req.models, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", Meal: row});
	});
});

router.get("/category/:category_id", function(req, res){
	mongoMeal.getMealByCategory(req.models, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", Meal: row});
	});
});

router.get("/restaurant/:rest_id", function(req, res){
	mongoMeal.getMealByRestaurant(req.models, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", Meal: row});
	});
});

/// PUT REQUEST

router.put("/update", function(req, res){
	mongoMeal.updateMeal(req.models, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", Meal: row});
	});
});

/// DELETE REQUEST

router.delete("/remove/:meal_id", function(req, res){
	mongoMeal.deleteMeal(req.models, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", Meal: row});
	});
});