var mongoose = require('mongoose');
var User = require('./User.js');
var Schema = mongoose.Schema

var songSchema = new Schema ({
	title: String,
	id: String
})

var playlistSchema = new Schema ({
	name: String,
	driver: String,
	guests: [{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User'
	}],
	songs: [songSchema]
})

var Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist;
