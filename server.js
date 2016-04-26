
var express 			= require('express'),
	app					= express(),
	bodyParser			= require('body-parser'),
	cookieParser 		= require('cookie-parser'),
	methodOverride		= require('method-override'),
	morgan						= require('morgan'),
	path							= require('path'),
	mongoose					= require('mongoose'),
	cors							= require('cors'),
	passport 					= require('passport'),
	passportSoundcloud	= require('passport-soundcloud'),
	passportSpotify		= require('passport-spotify'),
    auth        		= require('./api/config/auth.js'),
	apiRouter			= require('./api/routes/Routes'),
	SC 								= require('node-soundcloud'),
	port 				= process.env.PORT || 3000,
	mongoUri			= process.env.mLab || 'mongodb://localhost:27017/jukebox'

mongoose.connect(mongoUri)

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

// app.use(passport.initialize());
// app.use(passport.session());
// // app.use(flash());
//
// require('./api/config/passport')(passport);

app.use(function (req, res, next) {
  global.user = req.user;
  next()
});

////////////////////// node-soundcloud ////////////////////////////
// Initialize client
// SC.init({
//   id: 'your SoundCloud client ID',
//   secret: 'your SoundCloud client secret',
//   uri: 'your SoundCloud redirect URI'
// });
//
// // Connect user to authorize application
// var initOAuth = function(req, res) {
//   var url = SC.getConnectUrl();
//
//   res.writeHead(301, Location: url);
//   res.end();
// };

// Get OAuth token (example endpoint discussed in the next section)
////////////////////// node-soundcloud ////////////////////////////

app.use('/api', apiRouter)

app.listen(port)
console.log('listening on port ' + port)
