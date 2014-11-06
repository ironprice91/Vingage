var Video = require('../models/video.js');

var videoController = {
	addVideo: function(req,res){
		var videoData = req.body;
		var video = new Video(videoData);

		video.save(function(err, video){
			res.send(video);
		});
	}
};

module.exports = videoController;