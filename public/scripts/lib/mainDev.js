console.log('yo');

var video = document.getElementById('my-video');

var setCurTime = function(){
	video.currentTime = 5;
};

var getCurTime = function(){
	console.log(video.currentTime);
};