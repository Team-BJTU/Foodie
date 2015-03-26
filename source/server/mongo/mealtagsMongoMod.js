var dbAction = require("./dbAction");

/* GET user without his password */
module.exports.addMealTag = function(models, params, callback) {
	/*	TODO
		Check if user logged
	*/
	if (!params.momentum_id || !params.user_id || !params.meal_id)
		return callback("Missing parameters.");
	/* Check if user exist */
	dbAction.Get(models.Users, {_id : params.user_id, is_active : true}, function(err, row)
	{	
		if (err)
			return callback("Field user_id doesn't exist in the database.");
		/* Check if momentum exist */
		dbAction.Get(models.Momentums, {_id : params.momentum_id}, function(err, row) {
			if (err)
				return callback("Field momentum_id doesn't exist in the database");
			/* Check if meal exist */
			dbAction.Get(models.Meals, {_id : params.meal_id}, function(err, row)
			{
				if (err)
					return callback("Field meal_id doesn't exist in the database");
				/* Add in database */
				dbAction.Add(models.MealTags, params, callback);
			});
		});
	});
};

module.exports.getMealTags = function(models, params, callback) {
	/* TODO
		Check if user logged
	*/
	dbAction.Get(models.MealTags, params, callback);
};

/* DELETE user by setting is_active at false - Only for logged user or admin */
module.exports.deleteMealTags = function(model, id, callback) {
	/* TODO
		Check if user logged and admin
	*/
	dbAction.Remove(model, id, callback);
};
