var User = require('../models/User'),
	jwt = require('jsonwebtoken'),
	mySpecialSecret = "sausage";

function getLogout(req, res) {
  req.logout();
  res.redirect('/');
}

function index(req, res){
	User.find(function(err, users){
		if(err) res.send(err)
		res.json(users)
	})
}

function create(req, res){
	// make a single user -- create
	console.log("Creating a user")
	var user = new User()

	user.id = req.body.id
	user.username = req.body.username
	user.permalink = req.body.permalink
	user.uri = req.body.uri
	user.permalink_url = req.body.permalink_url
	user.avatar_url = req.body.avatar_url

	
	console.log("req is " + req)
	console.log("user is " + user)
	console.log("id is " + user.id)
	user.save(function(err){
		if(err){ console.log("this error is " + err)
			if(err.code == 11000){ console.log("nested if")
				return res.json({success: false, message: "An Account is already associated with that email" })
			} else {
				res.send(err)
			}
		}
		res.json({success: true, message: "Nah, Brah"})
	})
}

function show(req, res){
	//get a single user -- show
	User.findById(req.params.user_id, function(err, user){
		if(err) res.send(err)
		res.json(user)
	})
}

function getSoundcloud (req, res) {
  var signupStrategy = passport.authenticate ('soundcloud', {
     scope : 'soundcloudId'
  });
  return signupStrategy (req, res);
 }

function getSoundcloudCallback (req, res) {
  var loginProperty = passport.authenticate ('soundcloud', {
    successRedirect : '/',
    failureRedirect : '/login'
  });
  return loginProperty (req, res);
}
// function authenticateUser(req, res) {
// 	console.log('trying to authenticate')
// 	// 1 - find the user in our db
// 	User.findOne({
// 		username: req.body.username
// 	}).select('id username permalink uri permalink_url avatar_url').exec(function(err, user){
// 		if(err) throw err
// 		if(!user){
// 			res.json({success: false, message: "No such user, Brah."})
// 		} else if(user){
// 			// check passwords
// 			var validId = user.compareId(req.body.id)
// 			if(!validId){
// 				res.json({success: false, message: "Invalid ID, Brah."})
// 			} else {
// 				console.log(user.id)
// 				console.log(user.username)
// 				// password is good!
// 				var token = jwt.sign({
// 					id: user.id,
// 					username: user.username,
// 					permalink: user.permalink,
// 					uri: user.uri,
// 					permalink_url: user.permalink_url,
// 					avatar_url: user.avatar_url
// 				}, mySpecialSecret, {
// 					expiresInMinutes: 1440
// 				})
// 				// now let's actually give it to them!
// 				console.log("logged in")
// 				res.json({ success: true, message: "You're token up!", token: token})
// 			}
// 		}
// 	})
// }

module.exports = {
  index		: index,
  create	: create,
  show		: show,
  getLogout	: getLogout,
  getSoundcloud: getSoundcloud,
  getSoundcloudCallback: getSoundcloudCallback
  // authenticate: authenticateUser
}