angular.module('jukebox')
	.controller('UsersController', UsersController)
	// .factory('PlaylistsFactory', PlaylistsFactory)

UsersController.$inject = ['$state', 'authFactory', '$rootScope', '$window', 'editFactory', '$http', '$log', '$stateParams', '$location']

function UsersController($state, authFactory, $rootScope, $window, $editFactory, $http, $log, $stateParams){
	var vm = this
	vm.user = {}
	// vm.loggedIn = authFactory.isLoggedIn();
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
	vm.playlists = []
	vm.playlist = {}
	vm.playlistName = ''
	vm.playlistDriver = ''
	vm.playlistGuests = []
	vm.playlistSongs = []
	vm.userName = ''
	vm.addPlaylist = addPlaylist
	vm.indexPlaylists = indexPlaylists
	vm.nextsong = nextsong
	vm.url = ''
	vm.originUrl = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/'
	vm.startPlaylist = startPlaylist
	vm.currentSong = 0
	vm.previousSong = previousSong
	vm.ifSongs = ifSongs
	vm.removeSong = removeSong
	vm.getUsers = getUsers
	vm.indexUsers = indexUsers
	vm.users = []
	vm.addUsertoPL = addUsertoPL


	function nextsong() {
		//vm.playlist
		if (vm.currentSong < vm.playlist.songs.length - 1) {
			vm.currentSong += 1
			vm.url = vm.originUrl + vm.playlist.songs[vm.currentSong].id
		}else {
			vm.currentSong = 0
			vm.url = vm.originUrl + vm.playlist.songs[vm.currentSong].id
			console.log("playlist:url:",vm.url);
		}
		//console.log("playlist length:",vm.playlist.songs.length);
		console.log("currentSong:",vm.currentSong);
	}
	function previousSong() {
		if (vm.currentSong > 0) {
			vm.currentSong -= 1
			vm.url = vm.originUrl + vm.playlist.songs[vm.currentSong].id
		}else{
			vm.currentSong = vm.playlist.songs.length - 1
			vm.url = vm.originUrl + vm.playlist.songs[vm.currentSong].id
		}
		console.log("currentSong", vm.currentSong);
	}

	function addtoPL(data) {
		//console.log("data from function addtoPL",data);
		console.log("vm.playlist",data);
		$http.patch('http://localhost:3000/api/playlists/'+data.playlistId, {songId:data.songId, songs:data.playlist.songs, title:data.title})
		.then(function(response) {
			setPlaylist()
			console.log("response from patch playlist",response);
		})
	}
	function removeSong(data) {
		console.log("data from function removeSong",data);
		console.log("vm.playlist",data);
		$http.patch('http://localhost:3000/api/playlists/'+data.playlistId+'/remove', {songId:data.songId, songs:data.playlist.songs, title:data.title})
		.then(function(response) {
			setPlaylist()
			console.log("response from patch playlist",response);
		})
	}
	function addPlaylist(playlistName){
		var newPlaylist = {playlistName:playlistName, playlistDriver:$window.localStorage['currentUser']}
		//console.log('creating newPlaylist, data:', data);
		console.log('creating newPlaylist', newPlaylist);
		return $http.post('http://localhost:3000/api/playlists', newPlaylist).then(function(response){
		 console.log("successfully sent a playlist. response:", response);
		 vm.playlist = response.data
		})
	}
	// function removeSong(id) {
	//
	// }
	function ifSongs() {
		//console.log("ifSongs is working");
		//console.log("ifSongs song 0:",vm.songs[0]);
		if (vm.songs[0]) {
			return true
		}
		return false
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
		// authFactory.getUser()
		// .then(function(response){
		// 	// console.log("response.data is " +JSON.stringify(response.data))
		// 	vm.user = response.data
		// 	// console.log("vm.user is " + JSON.stringify(vm.user.userid))
		// 	vm.userid = vm.user.userid
		// 	console.log("vm.userid is " + vm.userid)
		// })
	}
	function indexUsers(){
		vm.users=[]
		//console.log("req from form",);
    $http({
      method: 'GET',
      url : 'http://localhost:3000/api/users'
    })
    .then(function(response){ //promise
			for (var i = 0; i < response.data.length; i++) {
				vm.users.push(response.data[i])
			}
			console.log("vm.users",vm.users);
			//console.log("response",response);
    })
	}
	function addUsertoPL(data) {
		console.log("data from function addUsertoPL",data);
		console.log("vm.playlist",data);
		$http.patch('http://localhost:3000/api/playlists/'+data.playlistId, {userId:data.userId, guests:data.playlist.guests})
		.then(function(response) {
			setPlaylist()
			console.log("response from patch playlist",response);
		})
	}
	// gets users on the playlist
	function getUsers(){
		// Rewrite this it's not the right thing

		// vm.users=[]
		// console.log("req from form", artist);
    // $http({
    //   method: 'GET',
    //   url : 'http://localhost:3000/api/users'
    // })
    // .then(function(response){ //promise
		// 	for (var i = 0; i < response.data.length; i++) {
		// 		vm.users.push(response.data[i])
		// 	}
		// 	console.log("vm.songs",vm.songs);
		// 	//console.log("response",response);
    // })
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
	}

// function playlistsFactory($http){
// 	var playlistsUrl = 'http://localhost:3000/api/playlists'
// 	var playlists = {}
function indexPlaylists() {
	//return
	$http.get('http://localhost:3000/api/users/id/'+$window.localStorage['currentUser'])
	.then(function(response) {
		//console.log("get a user playlist. response:", response);
		vm.playlists = response.data.playlists
		//vm.user.playlists = response.data.playlists
	})
}
if ($state.current.name == 'playlists') {
	indexPlaylists()
	//console.log("vm.user:",vm.user);
}
function startPlaylist() {
	console.log("startPlaylist is running");
	vm.currentSong = 0
	vm.url = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/'+vm.playlist.songs[0].id
	console.log("vm.url:", vm.url);
}
function setPlaylist() {
	//console.log("state parmas", $stateParams.playlistId);
	$http.get('http://localhost:3000/api/playlists/'+ $stateParams.playlistId).success(function(results){
		//console.log("this here is the results of playlist",results)
		vm.playlist = results
	})
}
if ($state.current.name == 'detail') {
	setPlaylist()
}
// vm.playlists.list = function(){
// 	return $http.get(playlistsUrl)
// }

// 	playlists.show = function(playlistId){
// 		return $http.get(playlistsUrl + '/' + playlistId)
// 	}

// 	playlists.addPlaylist = function(data){
// 		console.log("data is " + JSON.stringify(data))

// 		return $http.playlist(playlistsUrl, data)
// 	}

// 	playlists.addAlbumPlaylist = function(data){
// 		console.log("data is " + JSON.stringify(data))

// 		return $http.playlist(playlistsUrl, data)
// 	}

// 	playlists.updatePlaylist = function(playlistId,data){
// 		console.log("the factory data is " + JSON.stringify(data))
// 		return $http.patch(playlistsUrl + '/' + playlistId, data)
// 	}

// 	playlists.removePlaylist = function(playlistId){
// 		return $http.delete(playlistsUrl + '/' + playlistId)
// 	}

// 	return playlists
// }

// function PlaylistsController (playlistsFactory, $window){
// 	var vm = this;
// 	vm.api = playlistsFactory
// 	vm.playlists = []
// 	vm.newPlaylist = {}
// 	vm.api.list()
// 		.success(function(res){
// 			vm.playlists = res

	// function signup(userName){
	// 	var newUser = {userName:userName}
	// 	console.log("signup newUser",newUser );
	// 	return $http.post('http://localhost:3000/api/users', newUser).then(function(response) {
	// 		console.log("successfully sent a user. response:", response);
	// 		vm.user = response.data
	// 		login(userName)
	// 	})
	// }

// function PlaylistDetailsController(playlistsFactory,$stateParams,$location){
// 	var vm = this
// 	vm.name = 'Playlist Detail'
// 	vm.api = playlistsFactory
// 	vm.playlist = null
// 	vm.editing = false
// 	vm.showPlaylist = function(playlistId){
// 		console.log("playlist id is " + playlistId)
// 		vm.api.show(playlistId).success(function(response){
// 			vm.playlist = response
// 			console.log(response)
// 		})
// 	}
// 	vm.showPlaylist($stateParams.playlistId)

// 	vm.updatePlaylist = function(playlistId, name, guests, songs){
// 		var data = {name: name, guests:guests, songs:songs}
// 		vm.api.updatePlaylist(playlistId,data).success(function(response){
// 			console.log(response)
// 			vm.playlist = response
// 			vm.editing = false
// 		})
// 	}

// 	vm.removePlaylist = function(playlistId){
// 		vm.api.removePlaylist(playlistId).success(function(response){
// 			console.log(response)
// 			$location.path('/myplaylists')
// 		})
// 	}
}
