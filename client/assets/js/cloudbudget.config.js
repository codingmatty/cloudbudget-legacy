(function (angular) {

  var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope, AdminService) {
    // Initialize a new promise
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('/loggedin').success(function (response) {
      // Authenticated
      if (response.authenticated)
        /*$timeout(deferred.resolve, 0);*/
        deferred.resolve();

      // Not Authenticated
      else {
        AdminService.setUrlAfterLogin($location.url());
        deferred.reject();
        $location.url('/login');
      }
    }).error(function (err) {
      AdminService.setUrlAfterLogin($location.url());
      deferred.reject();
      $location.url('/login');
    });

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
          controller: 'DashboardController'
        }).when('/transactions/:transactionId?', {
          templateUrl: viewUri + 'transactions/transactions.html',
          controller: 'TransactionsController'
        }).when('/transactions/:transactionId/edit', {
          templateUrl: viewUri + 'transactions/transactions.html',
          controller: 'TransactionsController'
        }).otherwise({
          redirectTo: '/'
        });

        $locationProvider.html5Mode(true);

        RestangularProvider.setBaseUrl('/api/v1');
      }]);
})(window.angular);