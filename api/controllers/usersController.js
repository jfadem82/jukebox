var User = require('../models/User');
var Playlist = require('../models/Playlist');

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
	user.userName = req.body.userName

	
	console.log("req is " + req)
	console.log("user is " + userName)
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
  index		: index,
  create	: create,
  show		: show,
  getLogout	: getLogout,
  // authenticate: authenticateUser
}