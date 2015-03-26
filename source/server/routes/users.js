var express = require('express');
var router = express.Router();
var userUtils = require('./../mongo/usersMongoMod');
var passport = require('passport');

/* POST a new user in the database */
router.post('/new', function(req, res){
	if (req.user)
		return res.send(400, {error : "Can't register while being currently logged in."})
	userUtils.newUser(req.models.Users, req.body, function(err, row)
	{
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success"});
	});
});

/* Log an user */
router.post('/login',  function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
    if (err)
    	return next(err);
    if (req.user)
    	res.send(200, {error: "An user is already logged in, please logout."})
    if (!user)
    	return res.send(400, {error : "Invalid username or password."});
    req.logIn(user, function(err) {
      if (err)
      	return next(err);
      userUtils.updateUser(req.models.Users, req.user._id, {last_login : Date.now}, function(err, row) {
 			return ;
      });
      delete user["password"];
      // Delete password / is_admin / is_active
      return res.send(200, user);
    });
  })(req, res, next);
});

/* Log out the current user */
router.get('/logout', function(req, res) {
	if (!req.user)
		return res.send(400, {error : "No user logged in."});
	req.logout();
	return res.send(200, {message : "You are not logged out."});
});

/* PUT update info of user with _id = :id */
router.put('/update/:id', function(req, res)
{
	delete req.body['username'];
	delete req.body['last_login'];
	delete req.body['date_created'];
	delete req.body['date_updated'];
	delete req.body['is_admin'];
	if (!req.user)
		return res.send(400, {error : "You must be logged."});
	if (req.user._id != req.params.id && req.user.is_admin != true)
		return res.send(400, {error : "Permission denied."});
	userUtils.updateUser(req.models.Users, req.params.id, req.body, function(err, row) {
		if (err)
			return res.send(400, {error : err});
		return res.send(200, {message : "Update successful"});
	});
});

/* GET infos of user currenty logged in */
router.get('/profil/me', function(req, res){
	// Delete password / is_admin / is_active
	if (req.user)
 		return res.send(200, req.user);
 	else
 		return res.send(400, {error: "No user currently logged in."});
});

/* GET logged user info and momentums */
router.get('/me', function(req, res) {
	// Delete password / is_admin / is_active
});

/* GET user info and momentums */
router.get('/:id', function(req, res) {
	// Delete password / is_admin / is_active
});

/* GET user listing. */
router.get('/profil/all', function(req, res)
{
	// Delete password / is_admin / is_active
	// Wait for listing operations.
});

/* GET user with _id == :id */
router.get('/profil/:id', function(req, res)
{
	// Delete password / is_admin / is_active
	if (!req.user)
		return res.send(400, {error : "Permission denied."});
	userUtils.getUser(req.models.Users, {_id: req.params.id, is_active : true}, function(err, row) {
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success", foodie: row});
	});
});

/* DELETE user with _id = :id */
router.put('/delete/:id', function(req, res){
	if (!req.user)
		return res.send(400, {error : "You must be logged."});
	if (req.user._id != req.params.id && req.user.is_admin != true)
		return res.send(400, {error : "Permission denied."});
	userUtils.deleteUser(req.models.Users, {_id: req.params.id, is_active : true}, function(err, row)
	{
		if (err)
			return res.send(400, {error: err});
		return res.send(200, {message: "success"});
	})
});

module.exports = router;
