(function () {
	if (!Array.prototype.find) {
		Array.prototype.find = function (callback) {
			var returnVal;
			if (callback && angular.isFunction(callback)) {
				this.some(function (x, i, a) {
					if (callback(x, i, a)) {
						returnVal = x;
						return true;
					}
					return false;
				});
			}
			return returnVal;
		};
	}
})();