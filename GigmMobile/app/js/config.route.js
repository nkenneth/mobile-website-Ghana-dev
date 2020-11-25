(function() {
	'use strict';

	var app = angular.module('gigm');

	// Collect the routes
	app.constant('routes', getRoutes());

	// Configure the routes and route resolvers
	//app.config(['$routeProvider', 'routes', routeConfigurator]);


/*	app.config(function ($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise('/home');

	    $stateProvider.state('home', {
	        url: '/home',
	        templateUrl: '../app/views/home.html'
	    }).state('booking', {
	        url: '/booking',
	        controller: function () {
	           // console.log('reloaded!');
	          // $route.reload();
	        },
	        templateUrl: '../app/views/booking.html'
	    }).state('selection', {
	        url: '/selection',
	        templateUrl: '../app/views/bus-selection.html'
	    });


	});*/

	function routeConfigurator($routeProvider, routes) {

		routes.forEach(function(r) {
			$routeProvider.when(r.url, r.config);
		});
		$routeProvider.otherwise({
			redirectTo : '/'
		});
	}

	// Define the routes
	function getRoutes() {

	    return [
            {
                url: '/',
                config: {
                    title: 'Home',
                    templateUrl: '../app/views/home.html'
                }
            },
			{
					url : '/booking',
					config: {
					    title: 'Booking',
					    templateUrl: '../app/views/booking.html'
					}
				},
				{
					url : '/selection',
					config : {
						title : '',
						templateUrl: '../app/views/bus-selection.html',
					}
				},
			 ];
	}
})();