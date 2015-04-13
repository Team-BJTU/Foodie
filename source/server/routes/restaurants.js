var express = require('express');
var router = express.Router();
var mongoRest= require("../mongo/restaurantsMongoMod");

/// POST REQUEST
router.post("/new", function(req, res) {
	mongoRest.addRestaurant(req.models, req.body, function(err, row) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurant: row});
	});
});

/// GET REQUEST

router.get("/all", function(req, res) {
	mongoRest.getAllRestaurants(req.models.Restaurants, function (err, rows) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurants: rows});
	});
});

router.get("/id/:rest_id", function(req, res) {
	mongoRest.getRestaurantById(req.models.Restaurants, req.params.rest_id, function (err, row) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurant: row});
	});
});

router.get("/name/:name", function(req, res){
	mongoRest.getRestaurantByName(req.models.Restaurants, req.params.name, function (err, rows) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurants: rows});
	});
});

router.get("/category/:category_id", function(req, res) {
	mongoRest.getRestaurantByCategory(req.models.Restaurants, req.params.category_id, function (err, rows) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurants: rows});
	});
});

router.get("/city/:city", function(req, res) {
	mongoRest.getRestaurantByCity(req.models.Restaurants, req.params.city, function (err, rows) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurants: rows});
	});
});

/// PUT REQUEST

router.put("/update/:rest_id", function(req, res) {
	mongoRest.updateRestaurant(req.models, req.params.rest_id, req.body, function (err, row) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurant: row});
	});
});

/// DELETE REQUEST

router.delete("/remove/:rest_id", function(req, res) {
	mongoRest.deleteRestaurant(req.models.Restaurants, req.params.rest_id, function (err, row) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurant: row});
	});
});

module.exports = router;
