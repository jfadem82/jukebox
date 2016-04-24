var soundcloudStrategy	 = require('passport-soundcloud').Strategy;
var user 				         = require ('../models/User');
var configAuth       	   = require('./auth');

module.exports = function(passport) {

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