var express = require('express');
var router = express.Router();
var mongoMeal= require("../mongo/mealsMongoMod");

/// POST REQUEST
router.post("/new", function(req, res) {

});

/// GET REQUEST

router.get("/all", function(req, res){

});

router.get("/id/:meal_id", function(req, res){

});

// router.get("/GetMealByName", function(req, res){

// });

router.get("/category/:category_id", function(req, res){

});

router.get("/restaurant/:rest_id", function(req, res){

});

/// PUT REQUEST

router.put("/update", function(req, res){

});

/// DELETE REQUEST

router.delete("/remove/:meal_id", function(req, res){

});