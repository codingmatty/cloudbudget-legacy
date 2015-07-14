(function (angular) {
  var DashboardController = function (viewUri) {
    var dashboardVm = this;

    dashboardVm.getPlanView = function () {
      return viewUri + "planning/planning.html";
    };

    dashboardVm.getDailySummaryView = function () {
      return viewUri + "spendable/spendable_daily.html";
    };

    dashboardVm.getWeeklySummaryView = function () {
      return viewUri + "spendable/spendable_weekly.html";
    };

    dashboardVm.getMonthlySummaryView = function () {
      return viewUri + "spendable/spendable_monthly.html";
    };

    dashboardVm.getTransactionsView = function () {
      return viewUri + "transactions/transactions.html";
    };
  };

  angular.module('CloudBudget').controller('DashboardController', ['viewUri', DashboardController]);
})(window.angular);
