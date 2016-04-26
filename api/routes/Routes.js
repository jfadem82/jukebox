var express = require('express')
var apiRouter = express.Router() //get an instance of express 
var passport = require('passport')
var bodyParser = require('body-parser')
var usersController = require('../controllers/usersController')
var playlistsControllser = require('../controllers/playlistsController')
var User = require('../models/User')
// var Playlist = require('../models/Playlist')

apiRouter.route('/users')
	.post(usersController.create)
	//works in postman

//users index
apiRouter.route('/users')
	.get(usersController.index)
	//works in postman


//user CRUD
apiRouter.route('/users/:user_id')
	.get(usersController.show) //works in postman
	.delete(usersController.destroy) // works in postman

//posts CRUD
apiRouter.route('/playlists')
	.get(playlistsController.getAllPlaylists)
	.playlist(playlistsController.createPlaylist)

apiRouter.route('/playlists/:id')
	.get(playlistsController.getOnePlaylist)
	.patch(playlistsController.updatePlaylist)
	.delete(playlistsController.deletePlaylist)