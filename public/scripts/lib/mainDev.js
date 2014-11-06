var videos = new VideoList();

videos.reset(bootstrappedVideos);

var videoView = new VideoListView({
	attributes: {
		title: 'My Video Library'
	},
	collection: videos
});

// Render a note
var renderNote = function(videoData){
	var el = $('li');
};

$(function(){

	// render all videos and append
	videoView.render();
	$('body').append(videoView.el);

	// Make a new note on video
	$(document).on('click', '.toggle-new-note', function(e){
		var videoContainer = $(this).closest('li');
		var video = videoContainer.find('video');
		var videoId = video.attr('id');
		var thisVideo = document.getElementById(videoId);


		thisVideo.pause();

		
		
		console.log(thisVideo.currentTime);	
	});


	// deleting a single video
	$(document).on('click', '.deleteVideo', function(){
		var videoContainer = $(this).closest('li');
		var videoId = videoContainer.attr('data-video-container');

		$.post('/deleteVideo', {id: videoId}, function(responseData){
			console.log('responseData: ', responseData);
			if(responseData.success === true){
				videoContainer.remove();
			}
		});
	});

});