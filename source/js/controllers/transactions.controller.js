angular.module('CloudBudget')
.controller(
  'TransactionsController', 
  ['$scope', '$routeParams',
   function($scope, $routeParams) {
     var vm = this;

     var views = ['list', 'new', 'show'];
     
     var currentView = views[0];
     if ($routeParams.transactionId) {
       // TODO: if transactionId exists in Domain: show view, else: new view.
       currentView = views[2];
     }
     
     vm.getCurrentView = function() {
       return 'scripts/views/transactions/' + currentView + '.html';
     };
     vm.setCurrentView = function(viewId) {
       // TODO: if viewId is higher than views.length, throw error.
       currentView = views[viewId];
     }
     
     
   }]);