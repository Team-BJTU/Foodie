var express = require('express');
var router = express.Router();
var mongoMeal= require("../mongo/mealsMongoMod");

/// POST REQUEST
router.post("/AddMeal", function(req, res) {

});

/// GET REQUEST

router.get("/GetMeals", function(req, res){

});

router.get("/GetMealById/:meal_id", function(req, res){

});

// router.get("/GetMealByName", function(req, res){

// });

router.get("/GetMealByCategory/:category_id", function(req, res){

});

router.get("/GetMealByRestaurant/:rest_id", function(req, res){

});

/// PUT REQUEST

router.put("/UpdateMeal", function(req, res){

});

/// DELETE REQUEST

router.delete("/RemoveMeal/:meal_id", function(req, res){

});