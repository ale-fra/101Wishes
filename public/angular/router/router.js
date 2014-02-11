app.config(function($locationProvider, $routeProvider) {
    $locationProvider
        .html5Mode(true)
        .hashPrefix('!');
    $routeProvider
        .when('/', { templateUrl: '/page/home.html'})
        .when('/aboutUs', { templateUrl: '/page/aboutUs.html'})
        .when('/activate/:token', { templateUrl: '/page/activate.html', controller: ActivateCtrl})
        .when('/wishList', { templateUrl: '/page/wishList.html', controller: wishListCtrl})
        .otherwise({ redirectTo: '/' });
});


