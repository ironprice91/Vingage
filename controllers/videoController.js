var Video = require('../models/video.js');

var videoController = {
	addVideo: function(req,res){
		var videoData = req.body;
		var video = new Video(videoData);

		video.save(function(err, bird){
			res.send(video);
		});
	}
};

module.exports = videoController;