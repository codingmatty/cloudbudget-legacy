angular.module('CloudBudget')
.controller(
  'TransactionsController', 
  ['$scope', '$routeParams', '$location', 'Restangular',
   function($scope, $routeParams, $location, Restangular) {
     var vm = this;

     var transactionsRest = Restangular.all('transactions');
     transactionsRest.getList().then(function(transactions) {
       vm.transactions = transactions;
     });

     var views = ['list', 'form', 'show'];

     var currentView = views[0]; // 'list'
     if ($routeParams.transactionId) {
       // TODO: if transactionId exists in Domain: show view, else: new view.
       if ($location.path().endsWith('edit')) {
         currentView = views[1];
         
       }
       else {
         currentView = views[2];
       }
     }

     vm.getCurrentView = function() {
       return 'scripts/views/transactions/' + currentView + '.html';
     };
     vm.setCurrentView = function(viewId) {
       // TODO: if viewId is higher than views.length, throw error.
       currentView = views[viewId];
     }


   }]);