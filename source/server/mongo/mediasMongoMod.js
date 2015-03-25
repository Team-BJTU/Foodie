var dbAction = require("./dbAction");

module.exports.addMedia = function(models, params, files, req, callback) {
	dbAction.Get(models[params.target_type], {_id : params.target_id}, function(err, row){
		if (err)
			return callback(err);
		else if (row.length == 0)
			return callback({message : "Target doesn't not exist."});
		else if (row.user_id != req.user_id && req.user.is_admin != true)
			return callback({message : "Permission denied."});

		var messageString = "Failed to upload";
		var failed = false;
		var filePending = Object.keys(files).length;
		for (key in files)
		{
			var file = files[key];
			params['name'] = file.originalname;
			params['size'] = file.size;
			params['path'] = file.path;
			params['user_id'] = req.user.user_id;
			dbAction.Add(models.Pictures, params, function(err1, row1){
				if (err1)
				{
					/*
						TODO delete file row.path
					*/
					if (failed == false)
						messageString += " "  + row1.name;
					else
						messageString += ", " + row1.name;
					failed = true;
				}
				filePending -= 1;
				if (filePending == 0)
					return failed == true ? callback({message : messageString}) : callback(null, "Operation successful.");
			});
		}
	});
};

module.exports.deleteMedia = function(models, id, req, callback)
{
	dbAction.Get(models.Pictures, {_id : id}, function(err, row) {
		if (err)
			return callback(err);
		if (row.length == 0)
			return (callback({message : "Target not found."}));
		if (row.user_id != req.user_id && req.user.is_admin != true)
			return (callback({message : "Permission denied."}));
		else
		{
			/*
				TODO delete file row.path
			*/
			dbAction.Remove(models.Pictures, id, callback);	
		}
	});		
};