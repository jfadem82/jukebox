var express = require('express')
var apiRouter = express.Router() //get an instance of express
var passport = require('passport')
var bodyParser = require('body-parser')
var usersController = require('../controllers/usersController')
var playlistsController = require('../controllers/playlistsController')
var User = require('../models/User')
// var Playlist = require('../models/Playlist')

apiRouter.route('/users')
	.post(usersController.create)
	.get(usersController.index)

apiRouter.route('/users/id/:id')
	.get(usersController.showbyid)

//user CRUD
apiRouter.route('/users/:userName')
	.get(usersController.show) //works in postman
	//.delete(usersController.destroy) // works in postman

//posts CRUD
apiRouter.route('/playlists')
	.get(playlistsController.index)
	.post(playlistsController.create)

apiRouter.route('/playlists/:id')
	.get(playlistsController.getOnePlaylist)
	.patch(playlistsController.updatePlaylist)
	.delete(playlistsController.deletePlaylist)

apiRouter.route('/playlists/:id/remove')
	.patch(playlistsController.removeSong)

module.exports = apiRouter
