angular.module('CloudBudget')
  .controller(
  'DashboardController', 
  ['$routeParams', '$location', 'Restangular', 'matchmedia', 'SpendingService',
   function($routeParams, $location, Restangular, matchmedia, SpendingService) {
     var vm = this;
     
     vm.getDailySummaryView = function() {
       return "scripts/views/spendable/spendable_daily.html";
     };
     
     vm.getWeeklySummaryView = function() {
       return "scripts/views/spendable/spendable_weekly.html";
     };
     
     vm.getMonthlySummaryView = function() {
       return "scripts/views/spendable/spendable_monthly.html";
     };
     
     vm.getTransactionsView = function() {
       return "scripts/views/transactions/transactions.html";
     };
     
   }]);