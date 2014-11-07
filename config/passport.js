var User = require('../models/user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Uncomment to seed a user
/*// seed
var user = new User({
	username: 'Michael',
	email: 'michael@example.com',
	password: 'test'
});
user.save(function(err, user){
	if(err){
		console.log(err);
	} else {
		console.log('Seeded user');
	}
});*/

// sessions serialization
passport.serializeUser(function(user, next){
	// convert user object to session-storing id
	next(null, user._id);
});

passport.deserializeUser(function(id, next){
	User.findById(id, function(err, user){
		next(err, user);
	});
});


// STRATEGIES
var localStrategy = new LocalStrategy(
	function(username, password, next){
		User.findOne({username: username}, function(err, user){
			if(err){
				return next(err);
			}
			if(!user){
				return next(null, false);
			}
			// given user matches a database document
			user.comparePassword(password, function(err, isMatch){
				if(err){
					return next(err);
				}
				if(isMatch){
					return next(null, user);
				}
			});
		});
	}
);

passport.use(localStrategy);


// ensure authentication method (stay logged in)
module.exports = {
	ensureAuthenticated: function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect('/auth/login');
	}
};
