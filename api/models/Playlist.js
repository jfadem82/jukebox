var mongoose = require('mongoose');
var User = require('User');
var Schema = mongoose.Schema

var songSchema = new Schema ({
	title: String,
	length: Number,
	id: String
})

var playlistSchema = new Schema ({
	name: String,
	driver: String,
	guests: [User.schema],
	songs: [songSchema]


})

var Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist;