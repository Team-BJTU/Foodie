module.exports.Add = function(model, values, callback) {
	var newRow = new model(values);

	newRow.save(function(err, row) {
		if (callback) {
			if (err) {
				callback(err);
				return;
			}
			callback(err, row);
		} else {
			if (err) { throw err; }
		}

	});
};

module.exports.Get = function(model, option, callback) {
	model.find(option, function(err, result) {
		if (callback) {
			if (err) {
				callback(err);
				return;
			}
			callback(err, result);
		} else {
			if (err) { throw err; }
		}
	});
};

module.exports.Update = function(model, id, upValues, callback) {
	model.update({_id: id}, upValues, {multi: true}, function(err, row) {
		if (callback) {
			if (err) {
				callback(err);
				return;
			}
			callback(err, row);
		} else {
			if (err) { throw err; }
		}	
	});
};

module.exports.Remove = function(model, id, callback) {
	model.remove({_id: id}, function(err) {
		if (callback) {
			if (err) {
				callback(err);
				return;
			}
			callback(err, "ok");
		} else {
			if (err) { throw err; }
		}
	});
};

module.exports.RemoveWhere = function(model, params, callback) {
	model.remove(params, function(err)
	{
		if (callback) {
			if (err) {
				callback(err);
				return;
			}
			callback(err, "ok");
		} else {
			if (err) { throw err; }
		}
	});
}

module.exports.getAll = function(model, callback) {
	module.exports.Get(model, {}, function (err, results) {
		if (err)
			return callback(err);
		return callback(err, results);
	});
};

module.exports.getById = function(model, id, callback) {
	module.exports.Get(model, {_id: id}, function (err, result) {
		if (err)
			return callback(err);
		if (result.length > 0)
			return callback("Problem in the database (multiple id), please contact the administrator");
		return callback(err, result);
	});
};