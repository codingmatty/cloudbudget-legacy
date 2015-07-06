angular.module('CloudBudget')

/**
  * Constants Block
  */ 
.constant('baseUrl', 'http://localhost:8081')
.constant('apiUrl',  'http://localhost:8081/api/v1')
.constant('viewUri', 'views/')
          
/**
  * Global Values Block
  */ 
.value('globalValueExample', 'This is a global value object.')

/**
  * Cloud Budget Angular App Configuration
  */ 
.config(
  ['$routeProvider', '$locationProvider', 'RestangularProvider', 'viewUri',
   function($routeProvider, $locationProvider, RestangularProvider, viewUri) {
   $routeProvider
   .when('/', {
     templateUrl: viewUri + 'dashboard/dashboard.html',
     controller: 'DashboardController'
   })
   .when('/transactions/:transactionId?', {
     templateUrl: viewUri + 'transactions/transactions.html',
     controller: 'TransactionsController'
   })
   .when('/transactions/:transactionId/edit', {
     templateUrl: viewUri + 'transactions/transactions.html',
     controller: 'TransactionsController'
   })
   .otherwise({
     redirectTo: '/'
   });

   $locationProvider.html5Mode(true);
   
   RestangularProvider.setBaseUrl('/api/v1');
}]);