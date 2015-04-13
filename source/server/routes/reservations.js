var express = require('express');
var router = express.Router();
var mongoResa= require("../mongo/reservationsMongoMod");

/// POST REQUEST
router.post("/new", function(req, res) {
	mongoResa.addReservation(req.models, req.body, function(err, row) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", reservation: row});
	});
});

/// GET REQUEST

router.get("/all", function(req, res) {
	mongoResa.getAllReservations(req.models.Reservations, function (err, rows) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", reservations: rows});
	});
});

router.get("/id/:resa_id", function(req, res) {
	mongoResa.getReservationById(req.models.Reservations, req.params.resa_id, function (err, row) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", reservation: row});
	});
});

router.get("/UserId/:user_id", function(req, res) {
	mongoResa.getReservationsByUserId(req.models.Reservations, req.params.user_id, function (err, rows) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", reservations: rows});
	});
});

router.get("/RestId/:rest_id", function(req, res) {
	mongoResa.getReservationsByRestaurantId(req.models.Reservations, req.params.rest_id, function (err, rows) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", reservations: rows});
	});
});

/// PUT REQUEST

router.put("/update/:resa_id", function(req, res) {
	mongoResa.updateReservation(req.models, req.params.resa_id, req.body, function (err, row) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", reservation: row});
	});
});

/// DELETE REQUEST

router.delete("/remove/:resa_id", function(req, res) {
	mongoResa.deleteReservations(req.models.Reservations, req.params.resa_id, function (err, row) {
		if (err) return res.send(400, {error: err});
		return res.send(200, {message: "success", reservation: row});
	});
});

module.exports = router;
