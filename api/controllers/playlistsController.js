var Playlist = require('../models/Playlist');
var User	 = require('../models/User');

function index(req, res){
	Playlist.find(function(err, playlists){
		if(err) res.send(err)
		res.json(playlists)
	})
}

function create(req, res){
	var playlist = new Playlist()
	playlist.name	= req.body.name
	playlist.driver = req.body.driver
	playlist.guest  = req.body.guest
	playlist.song 	= req.body.song
	newPlaylist.save(function(err, playlist){
		if(err) throw err
		res.json({message: "Playlist Saved!", playlist: playlist})
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