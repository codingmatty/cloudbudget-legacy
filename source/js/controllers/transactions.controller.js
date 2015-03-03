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
  ['$scope', '$routeParams', '$location', 'Restangular', 'matchmedia',
   function($scope, $routeParams, $location, Restangular, matchmedia) {
     var vm = this;
     
     // Private Variables
     var views = ['list', 'form', 'show'];
     var currentView = 'list';
     var transactionsRest;
     
     // Public Variables
     vm.transactions = [];
     vm.currentTransaction = {};
     vm.showFormRow = false;
     
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
           transactionsRest.get($routeParams.transactionId).then(vm.editTransaction);
         } else {
           transactionsRest.get($routeParams.transactionId).then(vm.showTransaction);
         }
       } else {
         vm.listTransactions();
       }
     }
     
     var setCurrentTransaction = function(transaction) {
       vm.currentTransaction = transaction;
       if (transaction.date) {
        vm.currentTransaction.date = new Date(transaction.date);
       }
     }

     // Public functions
     vm.getCurrentView = function() {
       return 'scripts/views/transactions/partials/' + currentView + '.partial.html';
     };
     
     vm.listTransactions = function() {
       currentView = 'list';
       vm.showFormRow = false;
     };
     
     vm.createTransaction = function() {
       setCurrentTransaction({});
       if (!matchmedia.isDesktop()) {
         currentView = 'form';
       } else {
         currentView = 'list';
         vm.showFormRow = true;
       }
     };
     
     vm.editTransaction = function(transaction) {
       setCurrentTransaction(transaction);
       if (!matchmedia.isDesktop()) {
         currentView = 'form';
       } else {
         currentView = 'list';
         vm.showFormRow = true;
       }
     };
     
     vm.showTransaction = function(transaction) {
       currentView = 'show';
       setCurrentTransaction(transaction);
     };
     
     vm.saveTransaction = function(transaction) {
       if (transaction._id) {
         transactionsRest.customPUT(transaction, transaction._id);
       } else {
         transactionsRest.post(transaction).then(function(postedTransaction) {
           transaction._id = postedTransaction._id;
           vm.transactions.push(postedTransaction);
         });
       }
       setCurrentTransaction({});
       vm.listTransactions();
     }
     
     init();
   }]);