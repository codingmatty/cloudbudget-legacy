(function (angular) {
  var PlanningController = function (PlanService, SpendingService) {
    var planningVm = this;
    
    planningVm.currentPlan = {};

    var init = function () {
      PlanService.getPlan(function (plan) {
        planningVm.currentPlan = plan;
        planningVm.savePlan(planningVm.currentPlan);
      });
    };

    planningVm.calculateSpendable = function (plan) {
      return plan.monthlyIncome - plan.monthlyBills - plan.monthlySavings;
    };

    planningVm.savePlan = function (plan) {
      PlanService.savePlan(plan, function () {
        SpendingService.setMonthlySpendable(planningVm.calculateSpendable(plan));
      });
    };

    init();
  };

  angular.module('CloudBudget').controller('PlanningController', ['PlanService', 'SpendingService', PlanningController]);
})(window.angular);