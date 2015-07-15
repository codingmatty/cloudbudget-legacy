(function (angular) {
	var UserService = function (AccountHolder, $location) {
		var UserService = this;

		var loggedIn = false;
		var userId = null;

		UserService.LoggedIn = function () {
			return AccountHolder.isAuthenticated();
		};

		UserService.LogIn = function (username, password, cb) {
			AccountHolder.login({
				username: username,
				password: password
			}, function (res) {
					userId = res.userId;
					AccountHolder.id = userId;
					if (cb) cb(true);
				}, function (res) {
					userId = null;
					AccountHolder.id = userId;
					if (cb) cb(false);
				});
		};

		UserService.LogOut = function () {
			AccountHolder.logout();
			userId = null;
			AccountHolder.id = userId;
		};
	};
	angular.module('CloudBudget').service('UserService', ['AccountHolder', '$location', UserService]);
})(window.angular);