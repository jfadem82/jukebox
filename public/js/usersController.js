angular.module('jukebox')
	.controller('UsersController', UsersController)
	// .factory('PlaylistsFactory', PlaylistsFactory)

UsersController.$inject = ['$state', 'authFactory', '$rootScope', '$window', 'editFactory', '$http', '$log', '$stateParams', '$location']

function UsersController($state, authFactory, $rootScope, $window, $editFactory, $http, $log) {
	var vm = this
	vm.user = {}
	vm.api = editFactory
	vm.loggedIn = authFactory.isLoggedIn();
	vm.signup = signup
	vm.login = login
	vm.logout = logout
	vm.getUser = getUser
	vm.userid = {}
	vm.error = null
	vm.getArtist = getArtist;
	vm.artist = {}
	vm.songs = []
	vm.addtoPL = addtoPL
	vm.userName = ''

	function addtoPL(song) {
		console.log("song from function addtoPL",song);
	}

	function getArtist(artist){
		vm.songs=[]
		console.log("req from form", artist);
    $http({
      method: 'GET',
      url : 'https://api.soundcloud.com/tracks?client_id=030341538cff3ba796885fa35911cb51&q='+artist.name
    })
    .then(function(response){ //promise
			for (var i = 0; i < response.data.length; i++) {
				vm.songs.push(response.data[i])
			}
			console.log("vm.songs",vm.songs);
			//console.log("response",response);
    })
  }

	// $rootScope.$on('$stateChangeStart', function() {
	// 	vm.loggedIn = authFactory.isLoggedIn();
	// 	vm.getUser()
	// 	vm.error = null
	// });

	function logout(){
		$state.go('loggedOut')
		authFactory.logout();
		$window.location.reload();
	}

	function getUser(){
		authFactory.getUser()
		.then(function(response){
			// console.log("response.data is " +JSON.stringify(response.data))
			vm.user = response.data
			// console.log("vm.user is " + JSON.stringify(vm.user.userid))
			vm.userid = vm.user.userid
			console.log("vm.userid is " + vm.userid)
		})
	}

	function signup(userName){
		var newUser = {userName:userName}
		console.log("signup newUser",newUser );
		return $http.post('http://localhost:3000/api/users', newUser).then(function(response) {
			console.log("successfully sent a user. response:", response);
			vm.user = response.data
			login(userName)
		})
	}

	function login(userName){
		var user = {userName:userName}
		console.log("login user", user);
		return $http.get('http://localhost:3000/api/users/:user_id', user).then(function(response) {
			console.log("successfully logged in a user. response:", response);
		return $http.get('http://localhost:3000/api/users/'+userName)
		.then(function(response){
			console.log("login response:",response)
			$window.localStorage['currentUser'] = response.data._id
			$state.go('home')
		})
	})

function playlistsFactory($http){
	var playlistsUrl = 'http://localhost:3000/api/playlists'
	var playlists = {}

	playlists.list = function(){
		return $http.get(playlistsUrl)
	}

	playlists.show = function(playlistId){
		return $http.get(playlistsUrl + '/' + playlistId)
	}

	playlists.addPlaylist = function(data){
		console.log("data is " + JSON.stringify(data))
		
		return $http.playlist(playlistsUrl, data)
	}

	playlists.addAlbumPlaylist = function(data){
		console.log("data is " + JSON.stringify(data))

		return $http.playlist(playlistsUrl, data)
	}

	playlists.updatePlaylist = function(playlistId,data){
		console.log("the factory data is " + JSON.stringify(data))
		return $http.patch(playlistsUrl + '/' + playlistId, data)
	}

	playlists.removePlaylist = function(playlistId){
		return $http.delete(playlistsUrl + '/' + playlistId)
	}
	
	return playlists
}

function PlaylistsController (playlistsFactory, $window){
	var vm = this;
	vm.api = playlistsFactory
	vm.playlists = []
	vm.newPlaylist = {}
	vm.api.list()
		.success(function(res){
			vm.playlists = res

	
	vm.addPlaylist = function(name, driver, guests, songs ){
		
		var data = {name:name, driver:driver, guests:guests, songs:songs}
		

		vm.api.addPost(data)
			.then(function success(res){
				vm.posts.push(res.data.post)
				vm.newPost = {}
			})

	}

function PlaylistDetailsController(playlistsFactory,$stateParams,$location){
	var vm = this
	vm.name = 'Playlist Detail'
	vm.api = playlistsFactory
	vm.playlist = null
	vm.editing = false
	vm.showPlaylist = function(playlistId){
		console.log("playlist id is " + playlistId)
		vm.api.show(playlistId).success(function(response){
			vm.playlist = response
			console.log(response)
		})
	}
	vm.showPlaylist($stateParams.playlistId)

	vm.updatePlaylist = function(playlistId, name, guests, songs){
		var data = {name: name, guests:guests, songs:songs}
		vm.api.updatePlaylist(playlistId,data).success(function(response){
			console.log(response)
			vm.playlist = response
			vm.editing = false
		})
	}

	vm.removePlaylist = function(playlistId){
		vm.api.removePlaylist(playlistId).success(function(response){
			console.log(response)
			$location.path('/myplaylists')
		})
	}
}
})
}
}
}