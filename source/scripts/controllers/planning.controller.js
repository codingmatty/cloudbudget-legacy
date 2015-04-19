angular.module('CloudBudget')
  .controller(
  'PlanningController', 
  ['$routeParams', '$location', 'Restangular', 'SpendingService',
   function($routeParams, $location, Restangular, SpendingService) {
     var vm = this;
     
     // region Variables
     // region Private Variables
     var init = function() {
       
     }
     // endregion

     // region Public Variables
     vm.currentPlan = {};
     // endregion
     // endregion

     // region Functions
     // region Private Functions
     vm.calculateSpendable = function(plan) {
       return (plan.monthlyIncome || 0)
              - (plan.monthlyBills || 0)
              - (plan.monthlySavings || 0);
     };
     // endregion

     // region Public functions
     vm.savePlan = function(plan) {
       SpendingService.setMonthlySpendable(vm.calculateSpendable(plan));
     };
     // endregion
     // endregion
     
     init();
   }]);