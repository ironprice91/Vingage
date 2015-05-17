var Helper = {};

// function to remove videojs id concat
Helper.idFunc = function(string, split){

	// splitter or remove _html_api
	if(split){
		return string.split(/(_html5_api-)/);
	} else {
		return string.replace( /(_html5_api)/, '');
	}
};

module.exports = Helper;