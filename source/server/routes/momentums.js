var express = require('express');
var router = express.Router();
var momentumsUtils = require("../mongo/momentumsMongoMod");

/* POST a new momentum */
router.post('/new', function(req, res) {
	if (!req.user)
		return res.send(400, {error :"You must be logged in."});
	var tags = req.body.tags;
	delete req.body.tags;
	momentumsUtils.newMomentum(req.models, req.body, req.files, tags, req, function(err, row)
	{
		if (err)
			return res.send(400, {error: err});
		row["message"] = "Operation sucessful";
		return res.send(200, row);
	});
});

/* GET recent momentums. */
router.get('/recent/:nb_page', function(req, res)
{
});


/* GET momentum where user_id == :id :id/:order/:nb_page'*/
router.get('/user', function(req, res) {
	if (!req.user)
		return res.send(400, {error :"You must be logged in."});	
	momentumsUtils.getMultipleMomentums(req.models, {user_id : req.user.user_id}, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		row["message"] = "Operation sucessful";
		return res.send(200, row);
	});
});


/* GET momentum with _id == :id */
router.get('/:id', function(req, res)
{
	if (!req.user)
		return res.send(400, {error :"You must be logged in."});	
	momentumsUtils.getMomentum(req.models, req.params.id, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		row["message"] = "Operation sucessful";
		return res.send(200, row);
	});
});
/* GET FROM latitude latitude longitude */

/* GET FROM city */

/* GET momemtum where restaurant_id == restaurant_id */
router.get('/restaurant/:id/:order/:nb_page', function(req, res) {

});

/* GET momemtum who have been tagged with meal_id == :id */
router.get('/tag/:id', function(req, res) {

});

/* DELETE momentum and resources connected to it */
router.delete('/:id', function(req, res) {
	if (!req.user)
		return res.send(400, {error :"You must be logged in."});
	var params = {_id : req.params.id};
	if (req.user.is_admin == false)
		params[user_id] = req.user._id;
	momentumsUtils.deleteMomentum(req.models.Momentums, params, function(req, res){
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success"});
	});
});


module.exports = router;
