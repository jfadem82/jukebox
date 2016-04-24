var User = require('../models/User')

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

module.exports = {
  index		: index
  create	: create
  show		: show
  getLogout	: getLogout
}