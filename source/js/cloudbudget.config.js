angular.module('CloudBudget')

/**
  * Constants Block
  */ 
.constant('baseUrl', 'http://localhost:8081')
.constant('apiUrl','http://localhost:8081/api/v1')

/**
  * Global Values Block
  */ 
.value('globalValueExample', 'This is a global value object.')

/**
  * Cloud Budget Angular App Configuration
  */ 
.config(
  ['$routeProvider', '$locationProvider', 'RestangularProvider',
   function($routeProvider, $locationProvider, RestangularProvider) {
   $routeProvider
   .when('/', {
     templateUrl: 'scripts/views/dashboard/dashboard.html',
     controller: 'DashboardController'
   })
   .when('/transactions/:transactionId?', {
     templateUrl: 'scripts/views/transactions/transactions.html',
     controller: 'TransactionsController'
   })
   .when('/transactions/:transactionId/edit', {
     templateUrl: 'scripts/views/transactions/transactions.html',
     controller: 'TransactionsController'
   })
   .otherwise({
     redirectTo: '/'
   });

   $locationProvider.html5Mode(true);
   
   RestangularProvider.setBaseUrl('/api/v1');
}]);