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

     // region Variables
     // region Private Variables
     var views = ['list', 'form', 'show'];
     var currentView = 'list';
     var transactionsRest;
     // endregion

     // region Public Variables
     vm.transactions = [];
     vm.currentTransaction = {};
     vm.showFormRow = false;
     // endregion
     // endregion

     // region Functions
     // region Private Functions
     var init = function() {
       // Initialize Restangular object and populate transactions
       transactionsRest = Restangular.all('transactions');
       transactionsRest.getList().then(function(transactions) {
         vm.transactions = transactions;
         setCurrentTransaction(vm.transactions.find(function(x) {
           return x._id == $routeParams.transactionId;
         }));
       });

       // Use url path to setup view
       if ($routeParams.transactionId) {
         if ($routeParams.transactionId == 'new') {
           vm.createTransaction();
         } else if ($location.path().search('/edit') > 0) {
           vm.editTransaction({});
         } else {
           vm.showTransaction({});
         }
       } else {
         vm.listTransactions();
       }
     }

     var setCurrentTransaction = function(transaction) {
       vm.currentTransaction = transaction;
       if (transaction && transaction.date) {
         vm.currentTransaction.date = new Date(transaction.date);
       }
     }
     // endregion

     // region Public functions
     vm.getCurrentView = function() {
       return 'scripts/views/transactions/partials/' + currentView + '.partial.html';
     };

     vm.listTransactions = function() {
       currentView = 'list';
       vm.showFormRow = false;
     };

     vm.showTransaction = function(transaction) {
       currentView = 'show';
       setCurrentTransaction(transaction);
     };

     vm.createTransaction = function() {
       setCurrentTransaction({cleared: false});
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

     vm.deleteTransaction = function(transaction) {
       if (confirm('Are you sure you want to delete this transaction?!')) {
         transaction.customDELETE(transaction._id).then(function() {
           var transactionIdx = vm.transactions.indexOf(transaction);
           vm.transactions.splice(transactionIdx, 1);
         });
       }
     }

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
     // endregion
     // endregion

     init();
   }]);