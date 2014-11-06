var videos = new VideoList();

videos.reset(bootstrappedVideos);

var videoView = new VideoListView({
	attributes: {
		title: 'Cool video'
	},
	collection: videos
});

$(function(){

	// render all videos and append
	videoView.render();
	$('body').append(videoView.el);

	var video = document.getElementById('840a23cd227269b05a07794dcf963087.mp4_html5_api');

	var setCurTime = function(){
		video.currentTime = 5;
	};

	/*var getCurTime = function(){
		console.log(video.currentTime);
	};*/

	function newNote() {
		console.log('test');
	};

	var pauseVideo = function(){
		video.pause();
	};

	$(document).on('click', '.toggle-new-note', function(e){
		console.log(e);
		console.log(e.target);
		currentVid = $('.upload-video').siblings().closest('video').first();
		console.log('current Video', currentVid);
		currentVid.pause();
	});

});