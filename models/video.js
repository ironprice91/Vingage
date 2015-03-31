var mongoose = require('mongoose');
var User = require('./user');
var ObjectId = User._id;

console.log(User);
// AWS video Schema
var videoSchema = mongoose.Schema({
	title: String,
	videoSrc: String,
  owners: [User],
	notes: [{
		time: Number,
		displayTime: String,
		note: String
	}]
});

module.exports =  mongoose.model('video', videoSchema);
