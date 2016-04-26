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
    console.log("req.body",req.body);
		var newUser = new User(req.body)
    newUser.userName = req.body.userName
		newUser.save(function(err, user){
			if(err){
        console.log("newUser api controller error",err)
        res.json({success: false, error: err, user: user})
      }
      console.log("got to usersController, response",res);
			res.json({success: true, message: "User created!", user: user})
		})
	}

function show(req, res){
	//get a single user -- show
  console.log("show user req.params", req.params);
	User.findOne({userName: req.params.userName}, function(err, user){
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
