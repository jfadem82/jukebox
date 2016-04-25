var soundcloudStrategy	 = require('passport-soundcloud').Strategy;
var user 				         = require ('../models/User');
var configAuth       	   = require('./auth');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });
  
  passport.use(new SoundCloudStrategy({
    clientID: configAuth.soundcloudAuth.clientID,
    clientSecret: configAuth.soundcloudAuth.clientSecret,
    callbackURL: configAuth.soundcloudAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
    User.findOrCreate({ soundcloudId: profile.id }, function (err, user) {      
      if (err)
        return done(err);

      if (user) {
        return done(null, user)
      } else {
        var newUser     = new User();
        newUser.soundcloud.id = profile.id;
        newUser.soundcloud.token = token;
        newUser.soundcloud.name = profile.username;
        newUser.soundcloud.avatar_url = profile.avatar_url;

        newUser.save(function(err) {
          if(err)
            throw err;
          return done(null, newUser);
          })
        }
      })
    });
  })); 
}
