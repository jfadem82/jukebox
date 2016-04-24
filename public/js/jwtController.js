angular.module('jukebox')
	.controller('jwtController', jwtController) 

jwtController.$inject = ['$window', '$state', 'jwtHelper']

function jwtController($window, $state, jwtHelper) {
  var expToken = $window.localStorage.getItem('token')
  var tokenPayload = jwtHelper.decodeToken(expToken)
  var vm = this
  vm.print = print
  vm.id = ""

  function print(){
  	// console.log(tokenPayload)
  	// console.log(tokenPayload.userid)
  	vm.id = tokenPayload.userid
  	// console.log("vm.id is " + vm.id)
  }
}