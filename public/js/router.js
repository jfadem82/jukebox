angular.module('jukebox')
	.config(MainRouter)
	// .config(interceptor)

// function interceptor($httpProvider) {
// 	$httpProvider.interceptors.push('authInterceptorFactory')
// }

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

		.state('newplaylist', {
			url:'/newplaylist',
			templateUrl: 'partials/newplaylist.html',
			controller: 'UsersController as usersCtrl'
		})

		.state('playlists', {
			url: '/playlists',
			templateUrl: 'partials/playlists.html',
			controller: 'UsersController as usersCtrl'
		})

		.state('detail', {
			url:'/playlists/:playlistId',
			templateUrl: 'partials/detail.html',
			controller: 'UsersController as usersCtrl'
		})

		.state('edit-playlist', {
			url: '/edit-playlist',
			templateUrl: 'partials/edit-playlist.html',
			controller: 'UsersController as usersCtrl'
		})
	}
