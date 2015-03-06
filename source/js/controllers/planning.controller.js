angular.module('CloudBudget')
  .controller(
  'PlanningController', 
  ['$routeParams', '$location', 'Restangular', 'matchmedia', 'SpendingService',
   function($routeParams, $location, Restangular, matchmedia, SpendingService) {
     var vm = this;
     
     // region Variables
     // region Private Variables
     var init = function() {
       
     }
     // endregion

     // region Public Variables
     vm.monthlyIncome = 0;
     vm.monthlySavings = 0;
     vm.monthlyBills = [];
     vm.currentBill = {};
     // endregion
     // endregion

     // region Functions
     // region Private Functions
     billsCost = function(bills) { bills.reduce(function(x,y) { return x.amount + y.amount; }); };
     // endregion

     // region Public functions
     vm.monthlySpendable = function() {
       return vm.monthlyIncome
              - billsCost(vm.monthlyBills)
              - vm.monthlySavings;
     };
     
     vm.addBill = function(bill) {
       vm.monthlyBills.push(bill);
     };
     
     vm.savePlan = function(plan) {
       
     };
     // endregion
     // endregion
     
     init();
   }]);