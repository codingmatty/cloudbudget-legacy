(function (angular) {
  var SpendableController = function (SpendingService, TransactionService) {
    var vm = this;
    
    var init = function () {
      var today = new Date();
      var begOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      TransactionService.getTransactions({ where: { date: { gte: begOfMonth } } }, function (transactions) {
        transactions.forEach(function (x) {
          SpendingService.registerTransaction(x);
        });
      });
    };
    
    vm.dailySpendable = SpendingService.getDailySpendable;
    vm.dailySpent = SpendingService.getDailySpent;
    vm.dailyRemaining = function () {
      return vm.dailySpendable() - vm.dailySpent();
    };

    vm.weeklySpendable = SpendingService.getWeeklySpendable;
    vm.weeklySpent = SpendingService.getWeeklySpent;
    vm.weeklyRemaining = function () {
      return vm.weeklySpendable() - vm.weeklySpent();
    };

    vm.monthlySpendable = SpendingService.getMonthlySpendable;
    vm.monthlySpent = SpendingService.getMonthlySpent;
    vm.monthlyRemaining = function () {
      return vm.monthlySpendable() - vm.monthlySpent();
    };
     
    init();
  };

  angular.module('CloudBudget').controller('SpendableController', ['SpendingService', 'TransactionService', SpendableController]);

})(window.angular);