var dbAction = require("./dbAction");

module.exports.addMedia = function(models, params, files, req, callback) {
	dbAction.Get(models[params.target_type], {_id : params.target_id}, function(err, row){
		if (err)
			return callback(err);
		else if (row.length == 0)
			return callback({message : "Target doesn't not exist."});
		else if (row[0].user_id != req.user._id && req.user.is_admin != true)
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
			params['user_id'] = req.user._id;
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
					return failed == true ? callback({message : messageString + "."}) : callback(null, "Operation successful.");
			});
		}
	});
};

module.exports.addUserMedia = function(models, user, file, callback)
{
	var uploadUserMedia = function()
	{
		var params = {
			'name' : file.originalname,
			'size' : file.size,
			'path' : file.path,
			'user_id' : user._id,
			'target_id' : user._id,
			'target_type' : "Users"
		};
		
		dbAction.Update(models.Users, user._id, {picture_path : params.path, date_updated : Date.now()}, function(err, row)
		{
			if (err)
			{
				/*
					TODO delete file params.path
				*/
				return callback(err);
			}
			dbAction.Add(models.Pictures, params, function(err, row) {
				if (err)
					return callback(err);
				return callback(err, row);
			});
		});
	}
	if (user.picture_path && user.picture_path != "")
		dbAction.RemoveWhere(models.Pictures,{target_id: user._id, target_type: "Users"}, function(err, row) {
			if (err)
				return callback(err);
			/*
				TODO delete file user.path
			*/
			uploadUserMedia();
		});
	else
		uploadUserMedia();
};

module.exports.deleteMedia = function(models, params, req, callback)
{
	dbAction.Get(models.Pictures, params, function(err, row) {
		if (err)
			return callback(err);
		if (row.length == 0)
		{
			if (params.target_type && params.target_type == "Users" && req.user.picture_path)
				return dbAction.Update(models.Users, req.user._id, {picture_path: null}, callback);
			return (callback({message : "Target not found."}));
		}
		if (row[0].user_id != req.user._id && req.user.is_admin != true)
			return (callback({message : "Permission denied."}));
		else
		{
			/*
				TODO delete file row[0].path
			*/
			dbAction.Remove(models.Pictures, row[0]._id, function(err2, row2) {
				if (err2)
					callback(err2);
				if (row[0].target_type == "Users")
					dbAction.Update(models.Users, row[0].user_id, {picture_path: null}, callback);
				else
					callback(err2, row2);
			});
		}
	});		
};

