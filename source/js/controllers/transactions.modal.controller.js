angular.module('CloudBudget')
  .controller(
  'TransactionModalController', 
  ['viewUri', '$modalInstance','currentTransaction', 'currentView',
   function(viewUri, $modalInstance, currentTransaction, currentView) {
     var vm = this;
     vm.currentTransaction = currentTransaction;
     
     vm.getCurrentView = function() {
       return viewUri + 'transactions/partials/' + currentView + '.partial.html';
     };
     
     vm.listTransactions = function() {
       $modalInstance.close(vm.currentTransaction);
     };
     
     vm.selectXmlFile = function(xmlFileContent) {
       $modalInstance.close(xmlFileContent);
     };

     vm.cancel = function() {
       $modalInstance.dismiss('cancel');
     };
   }]);