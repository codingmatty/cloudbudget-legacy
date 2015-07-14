(function (angular) {
  var TransactionsController = function (viewUri, $routeParams, $location, matchmedia, TransactionService, AccountService, SpendingService, $modal) {
    var transactionsVm = this;

    var views = ['list', 'form', 'show'];
    var currentView = 'list';
    var originalTransaction = null;

    transactionsVm.transactions = [];
    transactionsVm.accounts = [];
    transactionsVm.currentTransaction = {};
    transactionsVm.showFormRow = false;


    function setCurrentTransaction(transaction) {
      transactionsVm.currentTransaction = transaction;
      if (transaction) {
        if (transaction.date) {
          transactionsVm.currentTransaction.date = new Date(transaction.date);
        }
      }
    }
    function init() {
      // Initialize Restangular object and populate transactions
      TransactionService.getTransactions({ include: 'Account' }, function (transactions) {
        transactionsVm.transactions = transactions;
        transactionsVm.transactions.forEach(function (x) {
          SpendingService.registerTransaction(x);
        });
        setCurrentTransaction(transactionsVm.transactions.find(function (x) {
          return x.id == $routeParams.transactionId;
        }));
      });
      AccountService.getAccounts({}, function (accounts) {
        transactionsVm.accounts = accounts;
      });
      
      // Use url path to setup view
      if ($routeParams.transactionId) {
        if ($routeParams.transactionId == 'new') {
          transactionsVm.createTransaction();
        } else if ($location.path().search('/edit') > 0) {
          transactionsVm.editTransaction(transactionsVm.currentTransaction);
        } else {
          transactionsVm.showTransaction(transactionsVm.currentTransaction);
        }
      } else {
        transactionsVm.listTransactions();
      }
    }

    function copyTransaction(transaction) {
      var newTransaction = {};
      newTransaction.id = transaction.id;
      if (transaction.date) {
        newTransaction.date = new Date(transaction.date);
      }
      newTransaction.payee = transaction.payee;
      newTransaction.amount = transaction.amount;
      newTransaction.account = transaction.account;
      newTransaction.cleared = transaction.cleared;
      newTransaction.tag = transaction.tag;

      return newTransaction;
    }

    transactionsVm.getCurrentView = function () {
      return viewUri + 'transactions/partials/' + currentView + '.partial.html';
    };

    transactionsVm.createTransaction = function () {
      setCurrentTransaction({ cleared: false });
      originalTransaction = null;
      if (!matchmedia.isDesktop()) {
        currentView = 'form';
      } else {
        currentView = 'list';
        transactionsVm.showFormRow = true;
      }
    };

    transactionsVm.listTransactions = function () {
      currentView = 'list';
      transactionsVm.showFormRow = false;
      originalTransaction = null;
    };

    transactionsVm.showTransaction = function (transaction) {
      setCurrentTransaction(transaction);
      if (!matchmedia.isDesktop()) {
        currentView = 'show';
      } else {
        $modal.open({
          templateUrl: viewUri + 'transactions/transactions.modal.html',
          controller: 'TransactionModalController as transactionVm',
          resolve: {
            currentTransaction: function () { return transactionsVm.currentTransaction; },
            currentView: function () { return 'show'; }
          }
        }).result.then(function (transaction) {
          // Modal closed.
        }, function () {
            // Modal dismissed.
          });
      }
    };

    transactionsVm.editTransaction = function (transaction) {
      setCurrentTransaction(transaction);
      originalTransaction = copyTransaction(transaction);

      var transactionIdx = transactionsVm.transactions.indexOf(transaction);
      transactionsVm.transactions.splice(transactionIdx, 1);

      if (!matchmedia.isDesktop()) {
        currentView = 'form';
      } else {
        currentView = 'list';
        transactionsVm.showFormRow = true;
      }
    };

    transactionsVm.saveTransaction = function (transaction) {
      TransactionService.saveTransaction(transaction, function (postedTransaction) {
        transactionsVm.transactions.push(postedTransaction);
        SpendingService.registerTransaction(postedTransaction);
      });

      setCurrentTransaction({});
      transactionsVm.listTransactions();
    };

    transactionsVm.deleteTransaction = function (transaction) {
      if (confirm('Are you sure you want to delete this transaction?!')) {
        TransactionService.deleteTransaction(transaction, function () {
          var transactionIdx = transactionsVm.transactions.indexOf(transaction);
          transactionsVm.transactions.splice(transactionIdx, 1);
          SpendingService.unregisterTransaction(transaction);
        });
      }
    };

    transactionsVm.cancelForm = function () {
      if (originalTransaction) {
        transactionsVm.transactions.push(originalTransaction);
      }
      setCurrentTransaction({});
      transactionsVm.listTransactions();
    };

    transactionsVm.orderTransactions = function (transaction) {
      return -(new Date(transaction.date).getTime());
    };

    transactionsVm.openImportModal = function () {
      $modal.open({
        templateUrl: viewUri + 'transactions/transactions.modal.html',
        controller: 'TransactionModalController as transactionVm',
        resolve: {
          currentTransaction: function () { return {}; },
          currentView: function () { return 'import'; }
        }
      }).result.then(function (xmlFile) {
        var transactions = ofx.parse(xmlFile);
        console.log(transactions);
      }, function () {
          // Modal dismissed.
        });
    };

    init();
  }
  angular.module('CloudBudget').controller('TransactionsController', ['viewUri', '$routeParams', '$location', 'matchmedia', 'TransactionService', 'AccountService', 'SpendingService', '$modal', TransactionsController]);
})(window.angular);