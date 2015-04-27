var express = require('express');
var router = express.Router();
var userUtils = require('./../mongo/usersMongoMod');
var dbAction = require('./../mongo/dbAction');

router.get('/', function (req, res) {
	console.log("in admin");
	res.render('index', {title: "Administration"});
});

router.get('/users/all', function (req, res) {
	dbAction.getAll(req.models.Users, function (err, rows) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", users: rows});
	})
});

router.get('/users/profil/:id', function (req, res) {
	userUtils.getUser(req.models.Users, {_id: req.params.id, is_active : true}, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", user: row});
	});
});

router.put('/users/update/:id', function(req, res)
{
	// delete req.body['username'];
	delete req.body['last_login'];
	delete req.body['date_created'];
	delete req.body['date_updated'];
	delete req.body['is_admin'];
	userUtils.updateUser(req.models.Users, req.params.id, req.body, function(err, row) {
		if (err)
			return res.send(400, {error : err});
		return res.send(200, {message : "Update successful", user: row});
	});
});

router.put('/users/disable/:user_id', function(req, res){
	userUtils.deleteUser(req.models.Users, req.params.user_id, {is_active : false}, function(err, row)
	{
		console.log("error: " + err);
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success"});
	});
});

router.delete('/users/delete/:user_id', function(req, res){
	dbAction.Remove(req.models.Users, req.params.user_id, function(err, row)
	{
		console.log("error: " + err);
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success"});
	});
});


module.exports = router;