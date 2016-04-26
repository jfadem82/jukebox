angular.module('jukebox', ['ui.router', 'angular-jwt'])

(function(){
	angular.module('jukebox', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider){

			// handle any attempts to routes other than what's listed below:
			$urlRouterProvider.otherwise('/')

			// my established routes
			$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'partials/home.html',
				controller: 'MainController as main'
			})
			.state('users', {
				url: '/users',
				templateUrl: 'partials/users.html',
				controller: 'MainController as main'
			})
			.state('newUser', {
				url: '/users/new',
				templateUrl: 'partials/new.html',
				controller: 'MainController as main'
			})
			.state('playlist', {
				url: '/playlist/:id',
				templateUrl: 'partials/detail.html',
				controller: 'MainController as main'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'partials/login.html'
			})
			.state('playlists', {
				url: '/users/:id/playlists',
				templateUrl: 'playlists.html',
				controller: 'MainController as main'
			})
		})
})()
