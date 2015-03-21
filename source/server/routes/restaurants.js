var express = require('express');
var router = express.Router();
var mongoRest= require("../mongo/restaurantsMongoMod");

/// POST REQUEST
router.post("/AddRestaurant", function(req, res) {
	mongoRest.addRestaurant(req.models.Restaurants, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurant: row});
	});
});

/// GET REQUEST

router.get("/GetRestaurants", function(req, res){

});

router.get("/GetRestaurantById/:rest_id", function(req, res){

});

// router.get("/GetRestaurantByName", function(req, res){

// });

router.get("/GetRestaurantByCategory/:category_id", function(req, res){

});

router.get("/GetRestaurantByCity/:city", function(req, res){

});

/// PUT REQUEST

router.put("/UpdateRestaurant", function(req, res){

});

/// DELETE REQUEST

router.delete("/RemoveRestaurant/:rest_id", function(req, res){

});