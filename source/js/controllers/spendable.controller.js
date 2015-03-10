angular.module('CloudBudget')
  .controller(
  'SpendableController', 
  ['$routeParams', '$location', 'Restangular', 'matchmedia', 'SpendingService',
   function($routeParams, $location, Restangular, matchmedia, SpendingService) {
     var vm = this;
     
     // region Functions
     // region Private Functions
     var init = function() {
       // Initialize Restangular object and populate transactions
       var today = new Date();
       var begOfMonth = new Date(today.getFullYear(),today.getMonth(),1);
       var transactionsRest = Restangular.all('transactions');
       transactionsRest.getList({startDate: begOfMonth}).then(function(transactions) {
         transactions.forEach(function(x) {
           SpendingService.registerTransaction(x);
         });
       });
     };
     // endregion
     
     // region Public Functions
     vm.dailySpendable = SpendingService.getDailySpendable;
     vm.dailySpent = SpendingService.getDailySpent;
     vm.dailyRemaining = function() {
       return vm.dailySpendable() - vm.dailySpent();
     };
     
     vm.weeklySpendable = SpendingService.getWeeklySpendable;
     vm.weeklySpent = SpendingService.getWeeklySpent;
     vm.weeklyRemaining = function() {
       return vm.weeklySpendable() - vm.weeklySpent();
     };
     
     vm.monthlySpendable = SpendingService.getMonthlySpendable;
     vm.monthlySpent = SpendingService.getMonthlySpent;
     vm.monthlyRemaining = function() {
       return vm.monthlySpendable() - vm.monthlySpent();
     };
     // endregion
     // endregion
     
     init();
   }]);