var dbAction = require("./dbAction");

module.exports.addRestaurant = function(models, values, callback) {
	var mailRegExp = new RegExp('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');

	if (!values || !values.name || !values.mail || !values.phone || !values.adress || !values.city || !values.zipcode || !values.country || !values.user_id) {
		if (values && !values.user_id)
			return callback("You have to be log in to add a restaurant");
		else
			return callback("You have to input the required fields");
	}

	if (!(values.mail.match(mailRegExp)))
		return callback("You wrote a wrong E-Mail adress, example: example@example.com");

	dbAction.Get(models.Restaurants, {name: values.name, adress: values.adress, city: values.city, country: values.country}, function (err, result) {
		if (err)
			return callback(err);
		if (result.length > 0)
			return callback("The Restaurant already exist");

		dbAction.Get(models.Users, {_id: values.user_id}, function (err, result) {
			if (err)
				return callback(err);
			if (result.length == 0)
				return callback("User doesn't exist");
			dbAction.Add(models.Restaurants, values, function (err, row) {
				if (err)
					return callback(err);
				return callback(err, row);
			});		
		});
	});
};

module.exports.getAllRestaurants = dbAction.getAll;

module.exports.getRestaurantById = dbAction.getById;

module.exports.getRestaurantByName = function (model, rest_name, callback) {
	dbAction.Get(model, {name: rest_name}, function (err, rows) {
		if (err)
			return callback(err);
		return callback(err, rows);
	});
};

module.exports.getRestaurantByCategory = function (model, category_id, callback) {
	dbAction.Get(model, {category_restaurant_id: category_id}, function (err, rows) {
		if (err)
			return callback(err);
		return callback(err, rows);
	});
};


module.exports.getRestaurantByCity = function (model, rest_city, callback) {
	dbAction.Get(model, {city: rest_city}, function (err, rows) {
		if (err)
			return callback(err);
		return callback(err, rows);
	});
};

module.exports.updateRestaurant = function (models, rest_id, values, callback) {
	var mailRegExp = new RegExp('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');

	if (!rest_id)
		return callback("You have to give an Restaurant ID");

	if (values.mail && !(values.mail.match(mailRegExp)))
		return callback("You wrote a wrong E-Mail adress, example: example@example.com");

	dbAction.Get(models.Restaurants, {_id: rest_id}, function (err, result) {
		if (err)
			return callback(err);
		if (result.length == 0)
			return callback("The restaurant doesn't exist");
		if (values.name) {
			dbAction.Get(models.Restaurants, {name: values.name, adress: values.adress, city: values.city, country: values.country}, function (err, result) {
				if (err)
					return callback(err);
				if (result.length > 0)
					return callback("The Restaurant already exist");

				dbAction.Get(models.Users, {_id: values.user_id}, function (err, result) {
					if (err)
						return callback(err);
					if (result.length == 0)
						return callback("User doesn't exist");
					dbAction.Update(models.Restaurants, rest_id, values, function (err, row) {
						if (err)
							return callback(err);
						return callback(err, row);
					});		
				});
			});
		} else {
			dbAction.Get(models.Users, {_id: values.user_id}, function (err, result) {
				if (err)
					return callback(err);
				if (result.length == 0)
					return callback("User doesn't exist");
				dbAction.Update(models.Restaurants, rest_id, values, function (err, row) {
					if (err)
						return callback(err);
					return callback(err, row);
				});		
			});
		}
	});
};

module.exports.deleteRestaurant = function (model, rest_id, callback) {
	if (!rest_id)
		return callback("You have to give a Restaurant ID");
	dbAction.Remove(model, rest_id, function (err, res) {
		if (err)
			return callback(err);
		if (res && res == "ok")
			callback(err);
	});
}