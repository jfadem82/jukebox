var express = require('express')
var apiRouter = express.Router() //get an instance of express router
var usersController = require('../controllers/usersController')
var User = require('../models/User')

apiRouter.route('/users')
	.post(usersController.create)

apiRouter.route('/authenticate')
	.post(usersController.authenticate)

apiRouter.route('/users')
	.get(usersController.index)

module.exports = apiRouter