$(function(){
	var video = document.getElementById('3419ea3a0430fea21179df3d39ec4a9a.mp4_html5_api');

	var setCurTime = function(){
		video.currentTime = 5;
	};

	/*var getCurTime = function(){
		console.log(video.currentTime);
	};*/

	var pauseVideo = function(){
		video.pause();
	};

	$(document).on('click', '.toggle-add-note', function(){
		$('#3419ea3a0430fea21179df3d39ec4a9a.mp4_html5_api').video.pause();
		video.get(0).pause();	
	});
});