var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs'); //
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var passsportConfig = require('./config/passport.js');

// encrypt lib for password
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');

// This allows express to parse incoming files from forms
var multer = require('multer');

var authenticationController = require('./controllers/authentication.js');
var indexController = require('./controllers/index.js');
var videoController = require('./controllers/videoController.js');

// Connect to our database called: videoApp
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/vidup');
require('./models/seeds/videoSeed.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());

// passport stuff
app.use(session({
	secret: 'secret key',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
//
app.use(passport.session());
app.get('/auth/login', authenticationController.login);
app.post('/auth/login', authenticationController.processLogin);
app.post('/auth/signup', authenticationController.processSignup);
app.get('/auth/logout', authenticationController.logout);


// ensure auth
app.use(passsportConfig.ensureAuthenticated);


app.get('/', indexController.index);
app.get('/videojs', indexController.videojs); // videojs loading
app.get('/view', indexController.view);
app.get('/view/:id', indexController.focusVideo);
app.get('/getNote/:id', videoController.getNote);
app.get('/theaterMode/:id', videoController.theaterMode);

app.post('/newVideo', multer(), indexController.newVideo);
app.post('/deleteVideo', videoController.deleteVideo);
app.post('/saveNote', videoController.addNote);
app.post('/updateNote/:id', videoController.updateNote);
app.post('/deleteNote', videoController.deleteNote);

var port = process.env.PORT || 6503;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});