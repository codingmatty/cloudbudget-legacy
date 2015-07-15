(function (angular) {
  var NavController = function (UserService) {
    var navVm = this;

    navVm.LoggedIn = UserService.LoggedIn;

    navVm.LogOut = UserService.LogOut;
  };

  angular.module('CloudBudget').controller('NavController', ['UserService', NavController]);
})(window.angular);