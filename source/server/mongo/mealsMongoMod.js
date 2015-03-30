var dbAction = require("./dbAction");

module.exports.addMeal = function(models, values, callback) {
	if (!values || !values.name || !values.price || !values.restaurant_id || !values.category_meal_id) {
		if (values && !values.restaurant_id)
			return callback("You have to add this meal for a restaurant");
		else
			return callback("You have to input the required fields");
	}

	dbAction.Get(models.Meals, {name: values.name, restaurant_id: values.restaurant_id, category_meal_id: values.category_meal_id}, function (err, result) {
		if (err)
			return callback(err);
		if (result.length > 0)
			return callback("The Meal already exist");

		dbAction.Get(models.Restaurants, {_id: values.restaurant_id}, function (err, result) {
			if (err)
				return callback(err);
			if (result.length == 0)
				return callback("Restaurant doesn't exist");
			dbAction.Add(models.Meals, values, function (err, row) {
				if (err)
					return callback(err);
				return callback(err, row);
			});		
		});
	});
};

module.exports.getAllMeals = dbAction.getAll;

module.exports.getMealById = dbAction.getById;

module.exports.getMealByName = function (model, meal_name, callback) {
	dbAction.Get(model, {name: meal_name}, function (err, rows) {
		if (err)
			return callback(err);
		return callback(err, rows);
	});
};

module.exports.getMealByCategory = function (model, category_id, callback) {
	dbAction.Get(model, {category_meal_id: category_id}, function (err, rows) {
		if (err)
			return callback(err);
		return callback(err, rows);
	});
};

module.exports.getMealByRestaurant = function (model, rest_id, callback) {
	dbAction.Get(model, {restaurant_id: rest_id}, function (err, rows) {
		if (err)
			return callback(err);
		return callback(err, rows);
	});
};

module.exports.updateMeal = function (models, meal_id, values, callback) {
	if (!meal_id)
		callback("You have to give a Meal ID");
	
	if (values.name) {		
		dbAction.Get(models.Meals, {name: values.name, restaurant_id: values.restaurant_id, category_meal_id: values.category_meal_id}, function (err, result) {
			if (err)
				return callback(err);
			if (result.length > 0)
				return callback("The Meal already exist");

			dbAction.Get(models.Restaurants, {_id: values.restaurant_id}, function (err, result) {
				if (err)
					return callback(err);
				if (result.length == 0)
					return callback("Restaurant doesn't exist");

				values.date_updated = new Date();
				dbAction.Update(models.Meals, meal_id, values, function (err, row) {
					if (err)
						return callback(err);
					return callback(err, row);
				});		
			});
		});
	} else {
		dbAction.Get(models.Restaurants, {_id: values.restaurant_id}, function (err, result) {
			if (err)
				return callback(err);
			if (result.length == 0)
				return callback("Restaurant doesn't exist");

			values.date_updated = new Date();
			dbAction.Update(models.Meals, meal_id, values, function (err, row) {
				if (err)
					return callback(err);
				return callback(err, row);
			});		
		});
	}
}

module.exports.deleteMeal = function (model, meal_id, callback) {
	if (!meal_id)
		return callback("You have to give a Restaurant ID");
	dbAction.Remove(model, meal_id, function (err, res) {
		if (err)
			return callback(err);
		if (res && res == "ok")
			callback(err);
	});
}