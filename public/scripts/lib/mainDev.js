$(function(){
	var video = document.getElementById('840a23cd227269b05a07794dcf963087.mp4_html5_api');

	var setCurTime = function(){
		video.currentTime = 5;
	};

	/*var getCurTime = function(){
		console.log(video.currentTime);
	};*/

	var pauseVideo = function(){
		video.pause();
	};

	$(document).on('click', '.toggle-add-note', function(e){
		console.log(e);
		console.log(e.target);
		currentVid = $(e.target).parent().closest('.video-js').first();
		console.log('current Video', currentVid);
		currentVid.pause();
	});

});