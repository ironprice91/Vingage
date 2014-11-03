var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var authentication = require('./controllers/authentication.js');
var passsportConfig = require('./config/passport.js');

// encrypt lib for password
var passport = require('passport');
var session = require('express-session');

// This allows express to parse incoming files from forms
var multer = require('multer');

var indexController = require('./controllers/index.js');

// Connect to our database called: videoApp
mongoose.connect('mongodb://localhost/vidup');
require('./models/seeds/videoSeed.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// passport stuff
app.use(session({secret: 'secret key'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authentication);
// ensure auth
app.use(passsportConfig.ensureAuthenticated);


app.get('/', indexController.index);
app.get('/view', indexController.view);
app.post('/submitPublic', multer(), indexController.submitPublic);
app.post('/submitPrivate', multer(), indexController.submitPrivate);

var server = app.listen(6503, function() {
	console.log('Express server listening on port ' + server.address().port);
});