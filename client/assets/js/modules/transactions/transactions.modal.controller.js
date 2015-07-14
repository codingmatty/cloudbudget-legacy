(function (angular) {
  var TransactionModalController = function (viewUri, $modalInstance, currentTransaction, currentView) {
    var transactionsVm = this;
    transactionsVm.currentTransaction = currentTransaction;

    transactionsVm.getCurrentView = function () {
      return viewUri + 'transactions/partials/' + currentView + '.partial.html';
    };

    transactionsVm.listTransactions = function () {
      $modalInstance.close(transactionsVm.currentTransaction);
    };

    transactionsVm.selectXmlFile = function (xmlFileContent) {
      $modalInstance.close(xmlFileContent);
    };

    transactionsVm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };

  angular.module('CloudBudget').controller('TransactionModalController', ['viewUri', '$modalInstance', 'currentTransaction', 'currentView', TransactionModalController]);
})(window.angular);