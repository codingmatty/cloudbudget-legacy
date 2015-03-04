angular.module('CloudBudget')
  .controller(
  'DashboardController', 
  ['$routeParams', '$location', 'Restangular', 'matchmedia', 'SpendingService',
   function($routeParams, $location, Restangular, matchmedia, SpendingService) {
     var vm = this;
     
     vm.getTransactionsView = function() {
       return "scripts/views/transactions/transactions.html";
     };
     
     vm.dailySpent = SpendingService.getDailyAmount;
     vm.weeklySpent = SpendingService.getWeeklyAmount;
     vm.monthlySpent = SpendingService.getMonthlyAmount;
   }]);