var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Playlist = require('Playlist');

var UserSchema = new Schema({
	userName: { type: String, required: true },
	playlist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Playlist'
	}
});

module.exports = mongoose.model("User", UserSchema);