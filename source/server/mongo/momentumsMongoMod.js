var dbAction = require("./dbAction");
var mediaUtils = require("./mediasMongoMod");
var mealtagsUtils = require("./mealtagsMongoMod");

/* New momemtum */
module.exports.newMomentum = function(models, params, files, tags, req, callback)
{
	var onSuccess = {};
	dbAction.Add(models.Momentums, params, function(err, row)
	{
		if (err)
			return callback(err);
		else
		{
			onSuccess.momemtum = row;
			var mediaParams = {
				target_type : "Momentums",
				target_id : row._id
				};
			if (Object.keys(files).length > 0)
				mediaUtils.addMedia(models, mediaParams, files, req, function(err, row)
				{
					if (err)
						return callback(err);
					else
					{
						onSuccess.pictures = row;
						if (tags != null)
						{
							mealtagsUtils.addMultipleTags(models, tags, function(err, row) {
								onSuccess.tags = row;
								return callback(null, onSuccess);
							});
						}
						else
							return callback(err, onSuccess);
					}
				});
			else
				return callback(err, onSuccess);	
		}
	});
};

/* GET momentum */
module.exports.getMomentum = function(models, id, callback) {
	var result =  {};
	dbAction.Get(models.Momentums, {_id : id}, function(err, row) {
		if (err)
			return callback(err);
		else
		{
			if (row.length == 0)
				return callback("No momentum found.");
			result.momemtum = row;
			var t_id = row._id;
			dbAction.Get(models.Pictures, {target_id : t_id}, function(err, row)
			{
				result.pictures = row;
				dbAction.Get(models.MealTags, {momentum_id : row._id}, function(err, row) {
					result.tags = row;
					return callback(null, result); 
				});
			});
		}
	});
};

/* GET multiples momentums */
module.exports.getMultipleMomentums = function(models, params, callback)
{
	dbAction.Get(models.Momentums, params, function(err, row) {
		if (err)
			return callback(err);
		if (Object.keys(row).length == 0)
			return callback("No momentum found.");
		var offset = 0;
		var length = row.length;
		var result = [];
		var recursiveSearch = function() {
			var momentum = row[offset];
-			dbAction.Get(models.Pictures, {target_id : momentum._id}, function(err, row) {
				momentum["pictures"] = row;
				console.log(row);
				dbAction.Get(models.MealTags, {momentum_id : momentum._id}, function(err, row) {
					momentum.tags = row;
					offset += 1;
					result.push(momentum);
					momentum.bitch = "ok";
					console.log(momentum);
					console.log("---------------");
					if (offset == length)
						return callback(null , result);
					else
						return recursiveSearch();
				});
			});
		};
		recursiveSearch();
	});
}

/* DELETE momentums - Only for logged user or admin */
module.exports.deleteMomentum = function(model, params, callback){ 	
	dbAction.RemoveWhere(model, params, callback);
};
