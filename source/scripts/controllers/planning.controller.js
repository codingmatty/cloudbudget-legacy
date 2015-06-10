angular.module('CloudBudget')
  .controller(
  'PlanningController', 
  ['$routeParams', '$location', 'Restangular', 'SpendingService',
   function($routeParams, $location, Restangular, SpendingService) {
     var vm = this;

     // region Variables
     // region Private Variables
     var planRest;
     // endregion

     // region Public Variables
     vm.currentPlan = {};
     // endregion
     // endregion

     // region Functions
     // region Private Functions
     var init = function() {
       // Initialize Restangular object and populate plan
       planRest = Restangular.one('plan');
       planRest.get().then(function(plan) {
         vm.currentPlan = plan;
         vm.savePlan(vm.currentPlan);
       });
     };
     // endregion

     // region Public functions
     vm.calculateSpendable = function(plan) {
       return plan.monthlyIncome - plan.monthlyBills - plan.monthlySavings;
     };

     vm.savePlan = function(plan) {
       if (plan._id) {
         planRest.doPUT(plan).then(function() {
           SpendingService.setMonthlySpendable(vm.calculateSpendable(plan));
         });
       }
     };
     // endregion
     // endregion

     init();
   }]);