var dbAction = require("./dbAction");

module.exports.addReservation = function (models, values, callback) {
	if (!values || !values.restaurant_id || !values.user_id || !values.date) {
		if (values && !values.user_id)
			return callback("You have to be log in to add a reservations");
		else
			return callback("You have to input the required fields");
	}

	dbAction.Get(models.Users, {_id: values.user_id}, function (err, result) {
		if (err) return callback(err);
		if (result.length == 0) return callback("User doesn't exist");
		dbAction.Get(models.Restaurants, {_id: values.restaurant_id}, function (err, result) {
			if (err) return callback(err);
			if (result.length == 0) return callback("Restaurant doesn't exist");
			dbAction.Get(models.Reservations, {user_id: values.user_id, restaurant_id: values.restaurant_id, date: values.date}, function (err, result) {
				if (err) return callback(err);
				if (result.length > 0) return callback("Your reservation already exist");
			});
			dbAction.Add(models.Reservations, values, function (err, row) {
				if (err) return callback(err);
				return callback(err, row);
			});
		});
	});
};

module.exports.getAllReservations = dbAction.getAll;

module.exports.getReservationById = dbAction.getById;

module.exports.getReservationsByUserId = function (model, usr_id, callback) {
	if (!usr_id) return callback("You have to give an user id");
	dbAction.Get(model, {user_id: usr_id}, function (err, rows) {
		if (err) return callback(err);
		callback(err, rows);
	});
};

module.exports.getReservationsByRestaurantId = function (model, rest_id, callback) {
	if (!rest_id) return callback("You have to give an restaurant id");
	dbAction.Get(model, {restaurant_id: rest_id}, function (err, rows) {
		if (err) return callback(err);
		callback(err, rows);
	});
};

module.exports.updateReservation = function (models, resa_id, values, callback) {
	dbAction.Get(models.Users, {_id: values.user_id}, function (err, result) {
		if (err) return callback(err);
		if (result.length == 0) return callback("User doesn't exist");
		dbAction.Get(models.Restaurants, {_id: values.restaurant_id}, function (err, result) {
			if (err) return callback(err);
			if (result.length == 0) return callback("Restaurant doesn't exist");
			
			values.date_updated = new Date();
			dbAction.Update(models.Reservations, values, function (err, row) {
				if (err) return callback(err);
				return callback(err, row);
			});
		});
	});
};

module.exports.deleteReservations = function (model, resa_id, callback) {
	if (!resa_id) return callback("You have to give a reservation id");
	dbAction.Remove(model, resa_id, function (err, result) {
		if (err) return callback(err);
		if (result && result == "ok") return callback(err);
	});
};