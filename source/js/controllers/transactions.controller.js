function Transaction() {
  this.date = new Date();
  this.payee = '';
  this.amount = 0;
  this.account = '';
  this.cleared = false;
  this.tag = '';
}

angular.module('CloudBudget')
.controller(
  'TransactionsController', 
  ['$scope', '$routeParams', '$location', 'Restangular',
   function($scope, $routeParams, $location, Restangular) {
     var vm = this;
     
     // Private Variables
     var views = ['list', 'form', 'show'];
     var transactionsRest;
     
     // Public Variables
     vm.transactions = [];
     vm.currentTransaction = {};
     
     // Private Functions
     var init = function() {
       // Initialize Restangular object and populate transactions
       transactionsRest = Restangular.all('transactions');
       transactionsRest.getList().then(function(transactions) {
         vm.transactions = transactions;
       });
       
       // Use url path to setup view
       if ($routeParams.transactionId) {
         if ($routeParams.transactionId == 'new') {
           vm.createTransaction();
         } else if ($location.path().search('/edit') > 0) {
           vm.editTransaction($routeParams.transactionId);
         } else {
           vm.showTransaction($routeParams.transactionId);
         }
       } else {
         vm.listTransactions();
       }
     }
     
     var setCurrentTransaction = function(transaction) {
       vm.currentTransaction = transaction;
       vm.currentTransaction.date = new Date(transaction.date);
     }

     // Public functions
     vm.getCurrentView = function() {
       return 'scripts/views/transactions/' + currentView + '.html';
     };
     
     vm.listTransactions = function() {
       currentView = 'list';
     };
     
     vm.createTransaction = function() {
       currentView = 'form';
       setCurrentTransaction(new Transaction());
     };
     
     vm.editTransaction = function(transactionId) {
       currentView = 'form';
       transactionsRest.get(transactionId).then(setCurrentTransaction);
     };
     
     vm.showTransaction = function(transactionId) {
       currentView = 'show';
       transactionsRest.get(transactionId).then(setCurrentTransaction);
     };
     
     vm.saveTransaction = function(transaction) {
       if (transaction._id) {
         transactionsRest.customPUT(transaction, transaction._id);
         vm.showTransaction(transaction._id);
       } else {
         transactionsRest.post(transaction).then(function(postedTransaction) {
           transaction._id = postedTransaction._id;
           vm.showTransaction(transaction._id);
         });
       }
     }
     
     init();
   }]);