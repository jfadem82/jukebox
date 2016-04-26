angular.module('jukebox')
	.config(MainRouter)
	.config(interceptor)

function interceptor($httpProvider) {
	$httpProvider.interceptors.push('authInterceptorFactory')
}

function MainRouter($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home')

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'partials/home.html',
			controller: 'UsersController as usersCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'partials/login.html',
			controller: 'UsersController as usersCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'partials/signup.html',
			controller: 'UsersController as usersCtrl'
		})
		.state('loggedOut', {
			url: '/loggedOut',
			templateUrl: 'partials/home.html',
			controller: 'UsersController as usersCtrl'
		})
		.state('search', {
			url: '/search',
			templateUrl: 'partials/search.html',
			controller: 'UsersController as usersCtrl'
		})
	}
