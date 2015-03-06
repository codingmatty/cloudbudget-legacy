angular.module('CloudBudget')
  .controller(
  'SpendableController', 
  ['$routeParams', '$location', 'Restangular', 'matchmedia', 'SpendingService',
   function($routeParams, $location, Restangular, matchmedia, SpendingService) {
     var vm = this;
     
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
     
   }]);