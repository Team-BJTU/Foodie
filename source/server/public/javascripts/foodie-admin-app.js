var app = angular.module("foodieAdminApp", []);


app.controller("usersTabCtrl", ["$scope", "usersService", function($scope, uservice) {
	$scope.usersList = [];
	$scope.updateUser = {};

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

	$scope.updateUserInfo = function() {
		uservice.updateUser($scope.updateUser._id, $scope.updateUser, function (err, user){
			if (err) return console.log(err) // Effectuer action en cas de problème
			uservice.getAllUsers(function(err, results) {
				if (err) return console.log(err); // Effectuer action en cas de problème
				$scope.usersList = results;
			});
			$('.userInfo').animate({ width: '0%', right: '0%' }, 'fast', function () { 
				$(this).hide();
			});
		});
	}

	$scope.deleteUser = function (user) {
		uservice.deleteUser(user._id, function (err, result) {
			if (err) return console.log(err) // Effectuer action en cas de problème
			$scope.usersList.splice($scope.usersList.indexOf(user), 1);
		});
	};

	$scope.showUserInfo = function (userId) {
		uservice.getUser(userId, function (err, user) {
			if (err) return console.log(err); // Effectuer action en cas de problème
			$scope.updateUser = user;
		});
	}
}]);