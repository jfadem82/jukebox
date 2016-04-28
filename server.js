
var express 			= require('express'),
	app							= express(),
	bodyParser			= require('body-parser'),
	cookieParser 		= require('cookie-parser'),
	methodOverride	= require('method-override'),
	morgan					= require('morgan'),
	path						= require('path'),
	mongoose				= require('mongoose'),
	cors						= require('cors'),
	apiRouter				= require('./api/routes/Routes.js')
	port 						= process.env.PORT,
	mongoUri				= process.env.mLab

mongoose.connect(mongoUri)

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', apiRouter)

app.listen(port)
console.log('listening on port ' + port)
