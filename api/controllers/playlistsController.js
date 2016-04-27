var Playlist = require('../models/Playlist.js');
var User	 = require('../models/User.js');

function index(req, res){
	Playlist.find({}, function(err, playlists){
		if(err) res.send(err)
		res.json(playlists)
	})
}

function create(req, res){
	console.log("api playlistsController create req:",req);
	var playlist 		= new Playlist()
	playlist.name		= req.body.playlistName
	playlist.driver = req.body.playlistDriver
	playlist.guest  = req.body.guest
	playlist.song 	= req.body.song
	playlist.save(function(err, playlist){
		if(err) throw err
		User.findById(req.body.playlistDriver, function(err,user) {
			if(err) console.log("user playlist error", err);
			//console.log("adding playlist to user, user:",user);
			//user.playlists += playlist._id
			user.playlists.push(playlist._id)
			console.log("user after playlist added",user);
			// user.save(function(err,user) {
			// 	if(err) console.log("user save error",err);
			// 	console.log("user after playlist added", user);
			// })
			res.json({message: "Playlist Saved!", playlist: playlist, user:user})
		})
	})
}

function getOnePlaylist(req,res){
	Post.findById(req.params.id, function(err,playlist){
		if(err) throw err
		res.json(playlist)
	})
}

function updatePlaylist(req,res){
	console.log("updating playlist in back end")
	Playlist.findOneAndUpdate({_id: req.params.id}, req.body, function(err,playlist){
		if(err) throw err
		Playlist.findById(req.params.id, function(err,updatedPlaylist){
			res.json(updatedPlaylist)
		})
	})
}

function deletePlaylist(req,res){
	Playlist.findOneAndRemove({_id: req.params.id}, req.body, function(err,playlist){
		if(err) throw err
		res.json({message:"playlist deleted!"})
	})
}

module.exports = {
	index: index,
  create: create,
  getOnePlaylist: getOnePlaylist,
  updatePlaylist: updatePlaylist,
	deletePlaylist: deletePlaylist
}
