var express = require('express');
var router = express.Router();
var mediasUtils = require("../mongo/mediasMongoMod");

router.post('/meal/new/:target_id', function(req, res) {
	if (!req.files)
		return res.send(400, {error : "Operation unsuccessful."});
	else if (!req.user)
		return res.send(400, {error : "You must be logged."});
	req.params['target_type'] = 'Meals'; 
	mediasUtils.addMedia(req.models, req.params, req.files, req, function(err, row)
	{
		if (err)
			return res.send(400, {error : err});
		return (res.send(200, {message : "Operation successful" , pictures : row}));
	});
});


router.post('/restaurant/new/:target_id', function(req, res) {
	if (!req.files)
		return res.send(400, {error : "Operation unsuccessful."});
	else if (!req.user)
		return res.send(400, {error : "You must be logged."});
	req.params['target_type'] = 'Restaurants'; 
	mediasUtils.addMedia(req.models, req.params, req.files, req, function(err, row)
	{
		if (err)
			return res.send(400, {error : err});
		return (res.send(200, {message : "Operation successful" , pictures : row}));
	});
});

router.post('/momentum/new/:target_id', function(req, res) {
	if (!req.files)
		return res.send(400, {error : "Operation unsuccessful."});
	else if (!req.user)
		return res.send(400, {error : "You must be logged."});
	req.params['target_type'] = 'Momentums'; 
	mediasUtils.addMedia(req.models, req.params, req.files, req, function(err, row)
	{
		if (err)
			return res.send(400, {error : err});
		return (res.send(200, {message : "Operation successful" , pictures : row}));
	});
});

router.post('/user/new', function(req, res) {
	
	if(!req.files)
		return res.send(400, {error : "Operation unsuccessful."});
	else if (!req.user)
		return res.send(400, {error : "You must be logged."});
	if (Object.keys(req.files).length > 1)
		return res.send(400, {error : "You can only upload one profil picture.s"});
	
	mediasUtils.addUserMedia(req.models, req.user, req.files[Object.keys(req.files)[0]], function(err, row)
	{
		if (err)
			return res.send(400, {error : err});
		return (res.send(200, {message : "Operation successful" , picture : row}));	
	});
});

router.delete('/:id', function(req, res) {
	if (!req.user)
		return (res.send(400, {error : "You must be logged."}));
	mediasUtils.deleteMedia(req.models, {_id : req.params.id}, req, function(err, row) {
		if (err)
			return res.send(400, {error : err});
		return res.send(200, {message : "Operation successful"});
	});
});

router.delete('/user', function(req, res) {
	if (!req.user)
		return (res.send(400, {error : "You must be logged."}));
	mediasUtils.deleteMedia(req.models, {user_id : req.user._id, target_id: req.user._id, target_type: "Users"}, req, function(err, row) {
		if (err)
			return res.send(400, {error : err});
		return res.send(200, {message : "Operation successful"});
	});
});
module.exports = router;