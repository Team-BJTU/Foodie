var dbAction = require("./dbAction");

/* GET user without his password */
module.exports.getUser = function(model, params, callback) {
	/*	TODO
		Check if user logged
	*/
	dbAction.Get(model, params, function(err, row)
		{
			if (err)
				return callback(err);
			delete row['password'];
			callback(err, row);
		});
};

/* NEW user in the database */
module.exports.newUser = function(model, params, callback)
{
	dbAction.Get(model, {username : params.username}, function(err, row)
	{
		if (err)
			return callback(err);
		else if (row.length != 0)
			return callback("Username already taken");
		delete params['is_admin'];
		delete params['is_active'];
		dbAction.Add(model, params, callback);
	});
};

/* UPDATE user */
module.exports.updateUser = function(model, id, params, callback) {
	params['date_updated'] = Date.now();
	dbAction.Update(model, id, params, function(err, row) {
		if (err)
			return callback(err);
		return callback(err, row);
	});
};

/* DELETE user by setting is_active at false - Only for logged user or admin */
module.exports.deleteUser = function(model, id, params, callback) {
	dbAction.Update(model, id, params, function(err, row) {
		if (err)
			return callback(err);
		return callback(err, row);
	});
};
