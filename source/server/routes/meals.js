var express = require('express');
var router = express.Router();
var mongoMeal= require("../mongo/mealsMongoMod");

/// POST REQUEST
router.post("/new", function(req, res) {
	mongoMeal.addMeal(req.models, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", meal: row});
	});
});

/// GET REQUEST

router.get("/all", function(req, res){
	mongoMeal.getAllMeal(req.models.Meals, function(err, rows) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", meals: rows});
	});
});

router.get("/id/:meal_id", function(req, res){
	mongoMeal.getMealById(req.models.Meals, req.params.meal_id, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", meal: row});
	});
});

router.get("/name/:name", function(req, res){
	mongoMeal.getMealByName(req.models.Meals, req.params.name, function(err, rows) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", meals: rows});
	});
});

router.get("/category/:category_id", function(req, res){
	mongoMeal.getMealByCategory(req.models.Meals, req.params.category_id, function(err, rows) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", meals: rows});
	});
});

router.get("/restaurant/:rest_id", function(req, res){
	mongoMeal.getMealByRestaurant(req.models.Meals, req.params.rest_id, function(err, rows) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", meals: rows});
	});
});

/// PUT REQUEST

router.put("/update", function(req, res){
	mongoMeal.updateMeal(req.models, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", meal: row});
	});
});

/// DELETE REQUEST

router.delete("/remove/:meal_id", function(req, res){
	mongoMeal.deleteMeal(req.models.Meal, req.params.meal_id, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", meal: row});
	});
});