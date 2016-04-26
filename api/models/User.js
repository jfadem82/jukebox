var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Playlist = require('./Playlist.js');

var UserSchema = new Schema({
	userName: String,
	playlist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Playlist'
	}
});

var User = mongoose.model('User', UserSchema)

module.exports = User;
