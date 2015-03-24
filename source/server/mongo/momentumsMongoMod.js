var dbAction = require("./dbAction");

/* GET user without his password */
module.exports.getMomentums = function(model, params, callback) {
	/*	TODO
		Check if user logged
	*/
	dbAction.Get(model, params, callback);
};

/* DELETE momentums - Only for logged user or admin */
module.exports.deleteMomentums = function(model, id, callback) {
	/* TODO
		Check if user logged and admin
	*/
	dbAction.Remove(model, id, callback);
};
