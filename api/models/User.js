var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
	soundcloud: {
   	id		  		: Number,
   	username  		: String,
   	permalink 		: String,
   	uri		  		: String,
   	permalink_url	: String,
   	avatar_url		: String
	}
})

module.exports = mongoose.model("User", UserSchema);