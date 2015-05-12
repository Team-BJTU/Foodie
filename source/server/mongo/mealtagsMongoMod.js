var dbAction = require("./dbAction");

module.exports.addMealTag = function(models, params, callback) {
	if (!params.momentum_id || !params.user_id || !params.meal_id)
		return callback("Missing parameters.");
	
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
};

module.exports.addMultipleTags = function(models, tags, callback)
{
	var tagsPending = tags.length;
	var result = [];
	var inside = false;
	for (tag in tags)
	{
		inside = true;
		if (tag.momentum_id && tag.user_id && tag.meal_id)
		{
			dbAction.Get(models.Meals, {_id : tag.meal_id}, function(err, row)
			{
				if (err)
					{
						tagsPending -= 1
						result.push({error : "Couldn't find meal_od " + tag.meal_id});
						if (tagsPending == 0)
							return (callback(null, result));
					}	
				else
					dbAction.Add(models.MealTags, tag, function(err, row) {
						tagsPending -= 1;
						if (err)
							result.push({ error : err});
						else
						{
							oneDone = true;
							result.push(row);
						}
						if (tagsPending == 0)
							return callback(null, result);
					});
			});	
		}
		else
		{
			result.push({error : "Missing parameters while trying to add mealtag for meal_id " + tag.meal_id });
			offset += 1;
		}
	}
	if (inside == false)
		return callback(null, result);
};

module.exports.add
module.exports.getMealTags = function(models, params, callback) {
	dbAction.Get(models.MealTags, params, callback);
};

module.exports.deleteMealTags = function(model, id, callback) {
	dbAction.Remove(model, id, callback);
};
