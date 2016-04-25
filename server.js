
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
	apiRouter			= require('./api/routes/Routes')
	port 				= process.env.PORT || 3000
	mongoUri			= process.env.mLab || 'mongodb://localhost:27017/jukebox'

mongoose.connect(mongoUri)

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

require('./api/config/passport')(passport);

app.use(function (req, res, next) {
  global.user = req.user;
  next()
});

app.get('/auth/soundcloud',
  passport.authenticate('soundcloud'));

app.get('/auth/soundcloud/callback',
  passport.authenticate('soundcloud', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.use('/api', apiRouter)

app.listen(port)
console.log('listening on port ' + port)
