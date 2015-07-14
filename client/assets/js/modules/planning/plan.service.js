(function (angular) {
	function PlanService(AccountHolder) {
		var PlanService = this;

		PlanService.getPlan = function (cb) {
			AccountHolder.Plan({ id: AccountHolder.id }).$promise.then(function (plan) {
				if (cb) cb(plan);
			});
		};

		PlanService.savePlan = function (plan, cb) {
			AccountHolder.Plan.update({ id: AccountHolder.id }, plan, function (resPlan) {
				if (cb) cb(resPlan);
			});
		};

	}

	angular.module('CloudBudget').service('PlanService', ['AccountHolder', PlanService]);
})(window.angular);