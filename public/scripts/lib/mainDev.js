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

	var setCurTime = function(){
		video.currentTime = 5;
	};

	/*var getCurTime = function(){
		console.log(video.currentTime);
	};*/

	function newNote() {
		console.log('test');
	};

	$(document).on('click', '.toggle-new-note', function(e){
		// need dynamic id
		document.getElementById('545ab8d7e2dec2adaf0655ec_html5_api').pause();
		console.log(document.getElementById('545ab8d7e2dec2adaf0655ec_html5_api').currentTime);
	});

/*	$(document).on('click', '.toggle-new-note', function(e){
		console.log(e);
		console.log(e.target);
		currentVid = $(e.target).children().closest('video').first();
		console.log('current Video', currentVid);
		currentVid.pause();
	});*/

});