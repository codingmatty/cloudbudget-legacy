angular.module('CloudBudget')
  .controller(
  'TransactionsController', 
  ['viewUri', '$routeParams', '$location', 'Restangular', 'matchmedia', 'SpendingService', '$modal',
   function(viewUri, $routeParams, $location, Restangular, matchmedia, SpendingService, $modal) {
     var vm = this;

     // region Variables
     // region Private Variables
     var views = ['list', 'form', 'show'];
     var currentView = 'list';
     var transactionsRest;
     var originalTransaction = null;
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
         vm.transactions.forEach(function(x) {
           SpendingService.registerTransaction(x);
         });
         setCurrentTransaction(vm.transactions.find(function(x) {
           return x._id == $routeParams.transactionId;
         }));
       });

       // Use url path to setup view
       if ($routeParams.transactionId) {
         if ($routeParams.transactionId == 'new') {
           vm.createTransaction();
         } else if ($location.path().search('/edit') > 0) {
           vm.editTransaction(vm.currentTransaction);
         } else {
           vm.showTransaction(vm.currentTransaction);
         }
       } else {
         vm.listTransactions();
       }
     };

     var setCurrentTransaction = function(transaction) {
       vm.currentTransaction = transaction;
       if (transaction) {
         if (transaction.date) {
           vm.currentTransaction.date = new Date(transaction.date);
         }
       }
     };
     // endregion

     // region Public functions
     vm.getCurrentView = function() {
       return viewUri + 'transactions/partials/' + currentView + '.partial.html';
     };

     vm.listTransactions = function() {
       currentView = 'list';
       vm.showFormRow = false;
       originalTransaction = null;
     };

     vm.showTransaction = function(transaction) {
       setCurrentTransaction(transaction);
       if (!matchmedia.isDesktop()) {
         currentView = 'show';
       } else {
         $modal.open({
           templateUrl: viewUri + 'transactions/transactions.modal.html',
           controller: 'TransactionModalController as transactionVm',
           resolve: {
             currentTransaction: function() { return vm.currentTransaction; },
             currentView: function() { return 'show'; }
           }
         }).result.then(function(transaction) {
           // Modal closed.
         }, function() {
           // Modal dismissed.
         });
       }
     };

     vm.createTransaction = function() {
       setCurrentTransaction({cleared: false});
       originalTransaction = null;
       if (!matchmedia.isDesktop()) {
         currentView = 'form';
       } else {
         currentView = 'list';
         vm.showFormRow = true;
       }
     };

     vm.editTransaction = function(transaction) {
       setCurrentTransaction(transaction);
       {
         originalTransaction = {};
         originalTransaction._id = transaction._id;
         if (transaction.date) {
           originalTransaction.date = new Date(transaction.date);
         }
         originalTransaction.payee = transaction.payee;
         originalTransaction.amount = transaction.amount;
         originalTransaction.account = transaction.account;
         originalTransaction.cleared = transaction.cleared;
         originalTransaction.tag = transaction.tag;
       }
       var transactionIdx = vm.transactions.indexOf(transaction);
       vm.transactions.splice(transactionIdx, 1);

       if (!matchmedia.isDesktop()) {
         currentView = 'form';
       } else {
         currentView = 'list';
         vm.showFormRow = true;
       }
     };

     vm.cancelForm = function() {
       if (originalTransaction) {
         vm.transactions.push(originalTransaction);
       }
       setCurrentTransaction({});
       vm.listTransactions();
     };

     vm.deleteTransaction = function(transaction) {
       if (confirm('Are you sure you want to delete this transaction?!')) {
         transaction.customDELETE(transaction._id).then(function() {
           var transactionIdx = vm.transactions.indexOf(transaction);
           vm.transactions.splice(transactionIdx, 1);
           SpendingService.unregisterTransaction(transaction);
         });
       }
     };

     vm.saveTransaction = function(transaction) {
       if (transaction._id) {
         transactionsRest.doPUT(transaction, transaction._id).then(function() {
           vm.transactions.push(transaction);
           SpendingService.registerTransaction(transaction);
         });
       } else {
         transactionsRest.post(transaction).then(function(postedTransaction) {
           transaction._id = postedTransaction._id;
           vm.transactions.push(postedTransaction);
           SpendingService.registerTransaction(transaction);
         });
       }
       setCurrentTransaction({});
       vm.listTransactions();
     };

     vm.orderTransactions = function(transaction) {
       return -(new Date(transaction.date).getTime());
     };

     vm.openImportModal = function() {
       $modal.open({
         templateUrl: viewUri + 'transactions/transactions.modal.html',
         controller: 'TransactionModalController as transactionVm',
         resolve: {
           currentTransaction: function() { return {}; },
           currentView: function() { return 'import'; }
         }
       }).result.then(function(xmlFile) {
       }, function() {
         // Modal dismissed.
       });
     };


     // endregion
     // endregion

     init();
   }]);
