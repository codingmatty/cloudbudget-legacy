(function (angular) {
	var LoginController = function (UserService, $location) {
		var loginVm = this;

		function resetForm(invalidLogin) {
			loginVm.message = invalidLogin ? 'Invalid Credentials. Try Again.' : '';
			loginVm.form = {
				email: '',
				password: ''
			};
		}
		resetForm();

		loginVm.submitLogin = function (form) {
			UserService.LogIn(form.username, form.password, function (success) {
				if (success) $location.path('/dashboard');
				else resetForm(true);
			});
		};
	};
	angular.module('CloudBudget').controller('LoginController', ['UserService', '$location', LoginController]);
})(window.angular);