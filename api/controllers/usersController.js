var User = require('../models/User.js');
var Playlist = require('../models/Playlist.js');

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

function create(req,res){
		var newUser = new User(req.body)
    newUser.userName = req.body.userName
		newUser.save(function(err, user){
			if(err){
        console.log("newUser api controller error",err)
        res.json({success: false, error: err, user: user})
      }
			res.json({success: true, message: "User created!", user: user})
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
  getLogout	: getLogout
}
