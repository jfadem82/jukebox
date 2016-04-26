var SC = require('node-soundcloud');
var configAuth = require('auth.js');


module.exports={
  // Initialize client
  // if (authToken) {
  //   SC.init({
  //     id: 'configAuth.soudcloudAuth.clientID',
  //     secret: 'configAuth.soudcloudAuth.clientSecret',
  //     uri: 'configAuth.soudcloudAuth.callbackURL',
  //     accessToken: 'your existing access token'//localstorage.token???
  //   });
  // }else {
    // Initialize client
    SC.init({
      id: 'configAuth.soudcloudAuth.clientID',
      secret: 'configAuth.soudcloudAuth.clientSecret',
      uri: 'configAuth.soudcloudAuth.callbackURL'
    });

    // Connect user to authorize application
    var initOAuth = function(req, res) {
      var url = SC.getConnectUrl();

      res.writeHead(301, Location: url);
      res.end();
    };
  //}

  var redirectHandler = function(req, res) {
  var code = req.query.code;

  SC.authorize(code, function(err, accessToken) {
    if ( err ) {
      throw err;
    } else {
      // Client is now authorized and able to make API calls
      return accessToken
      console.log('access token:', accessToken);
    }
  });
};
}
