var express = require('express');
var router = express.Router();
var mealtagsUtils = require("../mongo/mealtagsMongoMod");


/* POST a new tag in the database */
router.post('/new', function(req, res){
	if (!req.user)
		return res.send(400, {error : {message: "You must be logged"}});
	mealtagsUtils.addMealTag(req.models, req.body, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success"});
	});
});

/* GET tag from momemtum_id == :id OR */
router.get('momentum/:id', function(req, res)
{
	if (!req.user)
		return res.send(400, {error : {message: "You must be logged"}});
	mealtagsUtils.getMealTags(req.models.MealTags, {momentum_id: req.params.id}, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", mealtags: row});
	});
});

/* GET tag from user_id == :id */
router.get('/foodie/:id', function(req, res){
	if (!req.user)
		return res.send(400, {error : {message: "You must be logged"}});
	mealtagsUtils.getMealTags(req.models.MealTags, {user_id: req.params.id}, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", mealtags: row});
	});
});

/* GET tag from meal_id == :id */
router.get('/meal/:id', function(req, res){
	if (!req.user)
		return res.send(400, {error : {message: "You must be logged"}});
	mealtagsUtils.getMealTags(req.models.MealTags, {meal_id: req.params.id}, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", mealtags: row});
	});
});

/* DELETE a tag */
router.delete('/delete/:id', function(req, res) {
	if (!req.user)
		return res.send(400, {error : {message: "You must be logged"}});
	if (req.user.is_admin != true)
		return res.send(400, {error : {message: "Permission denied"}});
	mealtagsUtils.deleteMealTags(req.models.MealTags, req.params.id, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success"});
	});
});

module.exports = router;