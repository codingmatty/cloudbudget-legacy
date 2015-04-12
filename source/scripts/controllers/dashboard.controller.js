angular.module('CloudBudget')
  .controller(
  'DashboardController', 
  ['viewUri', '$routeParams', '$location', 'Restangular', 'SpendingService',
   function(viewUri, $routeParams, $location, Restangular, SpendingService) {
     var vm = this;
     
     vm.getDailySummaryView = function() {
       return viewUri + "spendable/spendable_daily.html";
     };
     
     vm.getWeeklySummaryView = function() {
       return viewUri + "spendable/spendable_weekly.html";
     };
     
     vm.getMonthlySummaryView = function() {
       return viewUri + "spendable/spendable_monthly.html";
     };
     
     vm.getTransactionsView = function() {
       return viewUri + "transactions/transactions.html";
     };
     
   }]);