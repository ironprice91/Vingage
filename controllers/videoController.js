var Video = require('../models/video.js');

// function to remove videojs id concat
var realId = function(string){
	return string.replace(/_html5_api/,'');
};

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
	},
	// Add note to specific id
	addNote : function(req,res){
		var videoId = req.body.id;		
		var videoData = req.body
		var id = realId(videoId);

		var oneNote = {
			time: videoData.time,
			displayTime: videoData.displayTime,
			note: videoData.note 
		};

		Video.findOneAndUpdate({_id: id}, {$push: {notes:oneNote}}, {safe: true, upsert:true}, function(err, result){
				if(err){
					console.log(err);	
				} else {
					console.log(result);	
				}	
		});
	},
	deleteNote: function(req,res){
		var videoId = req.body.id;
		var id = realId(videoId);
		console.log('HEY!', Video);

		Video.remove({_id: id}, function(err, result){
			console.log(id);
			res.send({
				err: err,
				result: result,
				success: err === null
			});
		});
	},
	theaterMode: function(req, res){
		var videoId = req.body.id;
		var id = realId(videoId);
		Video.findOne({_id: id}, function(err, result){
			console.log(result);
			res.send(result);
		});
	}
};

module.exports = videoController;