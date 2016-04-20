var expres 			= require('express'),
	app				= express(),
	bodyParser		= require('body-parser'),
	morgan			= require('morgan'),
	path			= require('path'),
	mongoose		= require('mongoose'),
	cors			= require('cors'),
	apiRouter		= require('./api/routes/Routes'),
	port 			= process.env.PORT || 3000
	mongoUri		= process.env.mLab || 'mongodb://localhost:27017/jukebox'

mongoose.connect(mongoUri)

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', apiRouter)

app.listen(port)
console.log('listening on port ' + port)