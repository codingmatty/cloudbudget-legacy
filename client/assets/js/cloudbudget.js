(function (window) {
	window._ = require('lodash');
	require('angular');
	require('angular-route');
	require('angular-resource');
	require('restangular');

	require('./lib');

	window.angular.module('CloudBudget', ['ngRoute', 'lbServices', 'ui.bootstrap', 'matchmedia-ng', 'restangular']);

	require('./cloudbudget.config.js');
	require('./common');
	require('./modules');
})(window);
