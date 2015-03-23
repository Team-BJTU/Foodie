var express = require('express');
var router = express.Router();
var mongoRest= require("../mongo/restaurantsMongoMod");

/// POST REQUEST
router.post("/new", function(req, res) {
	mongoRest.addRestaurant(req.models.Restaurants, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", restaurant: row});
	});
});

/// GET REQUEST

router.get("/all", function(req, res){

});

router.get("/id/:rest_id", function(req, res){

});

// router.get("/GetRestaurantByName", function(req, res){

// });

router.get("/category/:category_id", function(req, res){

});

router.get("/city/:city", function(req, res){

});

/// PUT REQUEST

router.put("/update", function(req, res){

});

/// DELETE REQUEST

router.delete("/remove/:rest_id", function(req, res){

});

module.exports = router;
