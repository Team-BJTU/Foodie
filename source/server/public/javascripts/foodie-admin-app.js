var app = angular.module("foodieAdminApp", []);


app.controller("usersTabCtrl", ["$scope", "usersService", function($scope, uservice) {
	$scope.usersList = {};
	uservice.getAllUsers(function(err, results) {
		if (err) return console.log(err); // Effectuer action en cas de problème
		$scope.usersList = results;
	});

	function addNewUser() {
		uservice.newUser({mail: $scope.mailAdd, username: $scope.usernameAdd, password: $scope.passwordAdd, birthDate: $scope.birthDateAdd, city: $scope.cityAdd}, function (err, user) {
			if (err) return console.log(err) // Effectuer action en cas de problème
			$scope.usersList.push(user);
            $("#addUserModal").modal("hide");

		});
	}

	$scope.addNewUser = addNewUser;
}]);