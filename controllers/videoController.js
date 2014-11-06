var Video = require('../models/video.js');

var videoController = {
	addVideo: function(req,res){
		var videoData = req.body;
		var video = new Video(videoData);

		video.save(function(err, video){
			res.send(video);
		});
	},
	deleteVideo: function(req,res){
		var videoId = req.params.id;

		console.log('video ID:', videoId);

		Video.remove({_id: videoId}, function(err, results){
			res.sendStatus(200);
		});
	}
};

module.exports = videoController;