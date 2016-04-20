var expres 			= require('express'),
	app				= express(),
	bodyParser		= require('body-parser'),
	morgan			= require('morgan'),
	path			= require('path'),
	mongoose		= require('mongoose'),
	cors			= require('cors'),
	port 			= process.env.PORT || 3000
	mongoUri		= process.env.mLab || 'mongodb://localhost:27017/jukebox'

mongoose.connect(mongoUri)

