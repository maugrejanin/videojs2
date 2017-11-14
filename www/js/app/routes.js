index.config
  (function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/index', {
            templateUrl: 'templates/index.html',
            controller: 'indexCtrl'
        })
        .when('/iframe', {
            templateUrl: 'templates/iframe.html',
            controller: 'indexCtrl'
        })
        .otherwise({redirectTo: '/iframe'});
});