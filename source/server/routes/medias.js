var express = require('express');
var router = express.Router();
var mediasUtils = require("../mongo/mediasMongoMod");

router.post('/meal/new/:target_id', function(req, res) {
	if (!req.files)
		return res.send(400, {error : { message : "Operation unsuccessful."}});
	else if (!req.user)
		return res.send(400, {error : { message : "You must be logged."}});
	req.params['target_type'] = 'Meals'; 
	mediasUtils.addMedia(req.models, req.params, req.files, req, function(err, row)
	{
		if (err)
			return res.send(400, {error : err});
		return (res.send(200, {message : "Upload successful."}));
	});
});


router.post('/restaurant/new/:target_id', function(req, res) {
	if (!req.files)
		return res.send(400, {error : {message : "Operation unsuccessful."}});
	else if (!req.user)
		return res.send(400, {error : {message : "You must be logged."}});
	req.params['target_type'] = 'Restaurants'; 
	mediasUtils.addMedia(req.models, req.params, req.files, req, function(err, row)
	{
		if (err)
			return res.send(400, {error : err});
		return (res.send(200, {message : "Upload successful."}));
	});
});

router.post('/momentum/new/:target_id', function(req, res) {
	if (!req.files)
		return res.send(400, {error : {message : "Operation unsuccessful."}});
	else if (!req.user)
		return res.send(400, {error : {message : "You must be logged."}});
	req.params['target_type'] = 'Momentums'; 
	mediasUtils.addMedia(req.models, req.params, req.files, req, function(err, row)
	{
		if (err)
			return res.send(400, {error : err});
		return (res.send(200, {message : "Upload successful."}));
	});
});

router.post('/user/new/:target_id', function(req, res) {
	//Check if user has a profile picture
		//If yes delete it then continue
	//New Entry in picture db
	//Update user
});

router.delete('/media/:id', function(req, res) {
	if (!req.user)
		return (res.send(400, {error : { message : "Permission denied. You must be logged."}}));
	mediasUtils.deleteMedia(req.models, req.params.id, req, function(err, row) {
		if (err)
			return res.send(400, {error : err});
		return res.send(200, {message : "Operation successful"});
	});
});

module.exports = router;