var express = require('express');
var router = express.Router();
var momentumsUtils = require("../mongo/momentumsMongoMod");

/* POST a new momentum */
router.post('new', function(req, res) {

});

/* GET users listing. */
router.get('recent/:nb_page', function(req, res)
{
	/* To define */
});

/* GET momentum with _id == :id */
router.get(':id', function(req, res)
{
	momentumsUtils.getMomentums(req.models.Momentums, {_id: req.params.id}, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", momentum: row});
	});
});

/* GET momentum where user_id == :id */
router.get('/user/:id/:order/:nb_page', function(req, res) {

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
	momentumsUtils.Remove(req.models.Momentums, req.params.id, function(req, res){
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success"});
	});
});


module.exports = router;
