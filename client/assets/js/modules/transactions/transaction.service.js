(function (angular) {
	function TransactionService(AccountHolder) {
		var TransactionService = this;

		TransactionService.getTransactions = function (queryObj, cb) {
			AccountHolder.Transactions({ id: AccountHolder.id, filter: queryObj }).$promise.then(function (transactions) {
				if (cb) cb(transactions);
			});
		};

		TransactionService.saveTransaction = function (transaction, cb) {
			if (transaction.id) {
				AccountHolder.Transactions.updateById({ id: AccountHolder.id, fk: transaction.id }, transaction, function (resTransaction) {
					if (cb) cb(resTransaction);
				});
			} else {
				AccountHolder.Transactions.create({ id: AccountHolder.id }, transaction, function (resTransaction) {
					if (cb) cb(resTransaction);
				});
			}
		};
		
		TransactionService.deleteTransaction = function(transaction, cb) {
			AccountHolder.Transactions.destroyById({ id: AccountHolder.id, fk: transaction.id }, function() {
				if (cb) cb();
			})
		}

	}

	angular.module('CloudBudget').service('TransactionService', ['AccountHolder', TransactionService]);
})(window.angular);