var express = require('express')
var apiRouter = express.Router() //get an instance of express 
var passport = require('passport')
var bodyParser = require('body-parser')
var usersController = require('../controllers/usersController')
var User = require('../models/User')

apiRouter.route('/users')
	.post(usersController.create)

apiRouter.route('/auth/soundcloud')
  .get(usersController.getSoundcloud)

apiRouter.route('/auth/soundcloud/callback')
   .get(usersController.getSoundcloudCallback)

apiRouter.route('/users')
	.get(usersController.index)

module.exports = apiRouter