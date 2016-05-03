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
			user.playlists.push(playlist)
			console.log("user after playlist added",user);
			user.save(function(err,user) {
				if(err) console.log("user save error",err);
				console.log("user after playlist added", user);
				res.json({message: "Playlist Saved!", playlist: playlist, user:user})
			})
		})
	})
}

function getOnePlaylist(req,res){
	Playlist.findById(req.params.id, function(err,playlist){
		if(err) throw err
		res.json(playlist)
	})
}

function updatePlaylist(req,res){
	console.log("removeSong req body",req.body);
	//console.log("update playlist req body",req.body);
	var songss = req.body.songs
	var newSong = {
		title: req.body.title,
		id: req.body.songId
	}
	songss.push(newSong)
	var updatedPlaylist = {
		songs: songss
	}
	Playlist.findOneAndUpdate({_id: req.params.id}, updatedPlaylist, {new: true}, function(err, playlist){
		if(err) return console.log(err)
		console.log("playlist after adding song", playlist);
		res.json({success: true, message: "Playlist updated!", playlist: playlist})
	})
	//console.log("songs on backend",songs);
}

function removeSong(req,res) {
	//console.log("removeSong req body",req.body);
	var songss = req.body.songs
	//console.log("songss",songss);
	var list = []
	songss.forEach(function(el,index) {
		list.push(el.id)
	})
	//console.log("indexOf song in list",list.indexOf(req.body.songId));
	songss.splice(list.indexOf(req.body.songId),1)
	var updatedPlaylist = {
		songs: songss
	}
	Playlist.findOneAndUpdate({_id: req.params.id}, updatedPlaylist, {new: true}, function(err, playlist){
		if(err) return console.log(err)
		console.log("playlist after deleting song", playlist);
		res.json({success: true, message: "Playlist updated!", playlist: playlist})
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
	deletePlaylist: deletePlaylist,
	removeSong: removeSong
}
