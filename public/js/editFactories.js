angular
	.module('jukebox')
	.factory('editFactory', editFactory)

editFactory.$inject = ['$http']

function editFactory($http){
	var usertoeditURL = 'http://localhost:3000/api/users'
	var url = 'http://localhost:3000/api/posts'
	var edits = {}

	editFactory.list = function(){
		return $http.get(usertoeditURL)
	}

	editFactory.updateinfo = function(userId,data){
		console.log("we in the factory bruh")
		console.log("factory data is " + JSON.stringify(data))
		return $http.put(usertoeditURL + '/' + userId, data)
	}

	return edits
}
