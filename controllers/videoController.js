var Video = require('../models/video.js');

var videoController = {
	deleteVideo: function(req,res){
		var videoId = req.body.id;
		console.log('video ID:', videoId);

		Video.remove({_id: videoId}, function(err, result){
			res.send({
				err: err,
				result: result,
				success: err === null
			});
		});
	}
	// Add note to specific id
	addNote : function(req,res){
		var videoData = req.body;

		Video.findById(videoData.id, function(err. result){
			console.log(videoData.title);
		});

		// var note = 'something';
		//var time = 'somethingElse';

		// Use set so things don't get erased
		/*Video.update({_id:id}, {$set: {notes:[{notes.time:time}, notes.note:note]}}, function(err, result){
			console.log(result);
		});*/
	}
};

module.exports = videoController;