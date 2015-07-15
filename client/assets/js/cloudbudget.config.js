(function (angular) {

  var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope, UserService) {
    // Initialize a new promise
    var deferred = $q.defer();

    if (!UserService.LoggedIn()) {
      deferred.reject();
      $location.url('/');
    } else {
      deferred.resolve();
    }
    
    return deferred.promise;
  };

  angular.module('CloudBudget')

  /**
    * Constants Block
    */
    .constant('baseUrl', 'http://localhost:3000')
    .constant('apiUrl', 'http://localhost:3000/api/v1')
    .constant('viewUri', '/templates/')
          
  /**
    * Global Values Block
    */
    .value('globalValueExample', 'This is a global value object.')

  /**
    * Cloud Budget Angular App Configuration
    */
    .config(
    ['$routeProvider', '$locationProvider', 'RestangularProvider', 'viewUri',
      function ($routeProvider, $locationProvider, RestangularProvider, viewUri) {
        $routeProvider
          .when('/', {
          templateUrl: viewUri + 'login/login.html',
          controller: 'LoginController'
        }).when('/dashboard', {
          templateUrl: viewUri + 'dashboard/dashboard.html',
          controller: 'DashboardController',
          resolve: {
            loggedin: checkLoggedin
          }
        }).when('/transactions/:transactionId?', {
          templateUrl: viewUri + 'transactions/transactions.html',
          controller: 'TransactionsController',
          resolve: {
            loggedin: checkLoggedin
          }
        }).when('/transactions/:transactionId/edit', {
          templateUrl: viewUri + 'transactions/transactions.html',
          controller: 'TransactionsController',
          resolve: {
            loggedin: checkLoggedin
          }
        }).otherwise({
          redirectTo: '/'
        });

        $locationProvider.html5Mode(true);

        RestangularProvider.setBaseUrl('/api/v1');
      }]);
})(window.angular);