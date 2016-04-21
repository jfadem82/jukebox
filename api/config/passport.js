var spotifyStrategy 	= require('passport-spotify').Strategy;
var soundcloudStrategy	= require('passport-soundcloud').Strategy;
var user 				= require ('../models/user');
var configAuth       	= require('./auth');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  passport.use(new SpotifyStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: "http://localhost:3000/auth/spotify/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
  passport.use(new SoundCloudStrategy({
    clientID: SOUNDCLOUD_CLIENT_ID,
    clientSecret: SOUNDCLOUD_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/soundcloud/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ soundcloudId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));