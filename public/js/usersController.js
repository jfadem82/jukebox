angular.module('jukebox')
	.controller('UsersController', UsersController)

UsersController.$inject = ['$state', 'authFactory', '$rootScope', '$window', 'editFactory', '$http', '$log']

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
		console.log("login function userName",userName);
		return $http.get('http://localhost:3000/api/users/'+userName)
		.then(function(response){
			console.log("login response:",response)
			$window.localStorage['currentUser'] = response.data._id
			$state.go('home')
		})
	}
}
