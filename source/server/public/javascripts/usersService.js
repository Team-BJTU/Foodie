app.service("usersService", ["$http", function ($http) {
	var users = {};

	this.newUser = function (values, callback) {
		$http.post("http://localhost:3000/foodie/new", values).success(function (data) {
			if (data.error) return callback(data.error);
			callback(null, data.user);
		});
	};

	this.getAllUsers = function (callback) {
		$http.get("http://localhost:3000/admin/users/all").success(function (data) {
			if (data.error) return callback(data.error);
			callback(null, data.users);
		}).error(function(data) {
			console.log("Error: " + data);
		});
	};

	this.getUser = function (userId, callback) {
		$http.get("http://localhost:3000/admin/users/profil/" + userId).success(function (data) {
			if (data.error) return callback(data.error);
			callback(null, data.user[0]);
		});
	};

	this.updateUser = function (userId, values, callback) {
		$http.put("http://localhost:3000/admin/users/update/" + userId, values).success(function (data) {
			if (data.error) return callback(data.error);
			callback(null, data.user);
		});
	}

	this.deleteUser = function (userId, callback) {
		$http.delete("http://localhost:3000/admin/users/delete/" + userId).success(function (data) {
			if (data.error) return callback(data.error);
			callback(null, data);
		});
	};
}]);