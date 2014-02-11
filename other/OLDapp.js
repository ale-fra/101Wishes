'use strict';
/**
 * Module dependencies.
 */

// mongoose setup
require( './db' );

// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	mongoose = require( 'mongoose' ), //MongoDB integration
	nodemailer = require("nodemailer");
var passport = require('passport');
var app = express();

//Import Service
var RestUserLogin = require('./config/User/RestUserLogin.js');
var RestMenu = require('./config/menu/restMenu.js');

var transport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "alessandro.francia@gmail.com",
        pass: "senodialfa"
    }
});



// Configure server
app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );



	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
	
	app.use(express.static('public'));
	  app.use(express.cookieParser());
	  app.use(express.session({ secret: 'keyboard cat' }));
	  app.use(passport.initialize());
	  app.use(passport.session());
	
	
	  //Where to serve static content
	  app.use( express.static( path.join( application_root, 'site') ) );
	  //perform route lookup based on url and HTTP method
	  app.use( app.router );
	
	
	
});

// Routes
app.get( '/api', function( request, response ) {
	response.send( 'Library API is running' );
});
//
//passport.use(new LocalStrategy(
//		  function(username, password, done) {
//			  console.log('called');
//			  UserModel.findOne({ UserName: username }, function(err, user) {
////				  console.log('find: err'+ err +'  user' + user );
//		      if (err) { return done(err); }
//		      if (!user) {
//		    	  console.log('Incorrect username.');
//		        return done(null, false, { message: 'Incorrect username.' });
//		      }
//		      if (user.PassWord != password) {
//		    	  console.log('Incorrect password.');
//		        return done(null, false, { message: 'Incorrect password.' });
//		      }
//		      console.log('ci siamo quasi.');
//		      return done(null, user);
//		    });
//		  }
//		));
//
////Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
//function ensureAuthenticated(req, res, next) {
//	console.log(req.user);
//	  if (req.isAuthenticated()) { return next(); }
//	  console.log('not autorized')
//	  res.send(403);
//	}
//
//// Check for admin middleware, this is unrelated to passport.js
//// You can delete this if you use different method to check for admins or don't need admins
function ensureAdmin(req, res, next) {

        if(req.user && req.user.Role === 'admin')
            next();
        else
            res.send(403);
};
//
//app.get('/isLogged', function( req, res ) {
//	if (req.isAuthenticated()) {
//		res.send({'status':'ok','role':req.user.Role,'username':req.user.UserName}); }
//	else{
//		res.send({'status':'ko'});
//
//	}
//});
//
//app.get('/logout', function(req, res){
//	  req.logout();
//	  res.send({'status':'ok','message':'LogOut eseguito'});
//	});
//
//app.post('/logintest',
//		  function(req, res, next) {
//		    console.log('before authenticate');
//		   passport.authenticate('local', function(err, user, info) {
//		      console.log('authenticate callback');
//		      if (err) { return res.send({'status':'err','message':err.message}); }
//		      if (!user) { return res.send({'status':'fail','message':info.message}); }
//		      req.logIn(user, function(err) {
//		        if (err) { return res.send({'status':'err','message':err.message}); }
//		        return res.send({'status':'ok','role':user.Role,'username':user.UserName});
//		      });
//		    })(req, res, next);
//		  },
//		  function(err, req, res, next) {
//		    // failure in login test route
//		    return res.send({'status':'err','message':err.message});
//		  });
















      /*
       app.get( '/api/getMenu', function( req, res ) {
       app.put( '/api/setMenu', ensureAdmin, function( req, res ) {

       */





//app.get( '/api/getMenu', function( request, response ) {
//	var url_parts = url.parse(request.url,true);
//	var role = url_parts.query['role'];
//	console.log('{"Permesso": {$lte:'+ role+'}');
//return MenuList.find({"Permesso": {$lte: role}}, function( err, menuList ) {
//		if( !err ) {
//			//console.log(menuList);
//			return response.send( menuList );
//		} else {
//			return console.log( err );
//		}
//	});
//
//});
////Get a list of all books
//app.get( '/api/user/:username', function( request, response ) {
//	return UserModel.findById( request.params.id, function( err, user ) {
//		if( !err ) {
//			console.log( err );
//			return response.send( user );
//		} else {
//			return console.log( err );
//		}
//	});
//});
//
////Get a single book by id
//app.get( '/api/user', function( request, response ) {
//	return UserModel.find({} , function( err, user ) {
//		if( !err ) {
//			return response.send( user );
//		} else {
//			return console.log( err );
//		}
//	});
//});
//
////Insert a new book
//app.post( '/api/user', function( request, response ) {
//	var user = new UserModel({
//		UserName: request.body.UserName,
//		PassWord: request.body.PassWord,
//		Email: request.body.Email
//		});
//
//	UserModel.find({UserName: user.UserName}, function(err, doc) {
//		console.log(typeof(doc));
//        if (doc.length){
//        	console.log(doc);
//        	console.log('username already used');
//        	return response.send('username already used');
//        } else {
//        	user.save( function( err ) {
//    			if( !err ) {
//    				console.log( 'created' );
//
//    				var mailOptions = {
//    					    transport: transport, // transport method to use
//    					    from: "Sender Name <sender@example.com>", // sender address
//    					    to: request.body.Email, // list of receivers
//    					    subject: "Welcome!", // Subject line
//    					    text: "Benvenuto !", // plaintext body
//    					    html: "<b>You're welcome!</b>" // html body
//    					}
//
//    					nodemailer.sendMail(mailOptions, function(error){
//    					    if(error){
//    					        console.log(error);
//    					    }else{
//    					        console.log("Message sent!");
//    					    }
//    					    transport.close(); // lets shut down the connection pool
//    					});
//    				return response.send( 'created' );
//    			} else {
//    				console.log( err );
//    				response.send(err);
//    			}
//    		});
//
//
//        }
//
//	});
//
//
//
//});



//
//app.put( '/api/books/:id', function( request, response ) {
//	console.log( 'Updating book ' + request.body.title );
//	return BookModel.findById( request.params.id, function( err, book ) {
//		book.title = request.body.title;
//		book.author = request.body.author;
//		book.releaseDate = request.body.releaseDate;
//		book.keywords = request.body.keywords;
//
//		return book.save( function( err ) {
//			if( !err ) {
//				console.log( 'm updated' );
//			} else {
//				console.log( err );
//			}
//			return response.send( book );
//		});
//	});
//});
//
////Delete a book
//app.delete( '/api/books/:id', function( request, response ) {
//	console.log( 'Deleting book with id: ' + request.params.id );
//	return BookModel.findById( request.params.id, function( err, book ) {
//		return book.remove( function( err ) {
//			if( !err ) {
//				console.log( 'Book removed' );
//				return response.send( '' );
//			} else {
//				console.log( err );
//			}
//		});
//	});
//});


//Routes
    // UserLogin
app.get('/isLogged',RestUserLogin.isLogged);
app.get('/logout', RestUserLogin.logout);
app.post('/logintest',RestUserLogin.logintest);
     //menu
app.get( '/api/getMenu', RestMenu.getMenu);
app.put( '/api/setMenu',RestMenu.setMenu);
//Start server
if(process.env.VCAP_APP_PORT){
	app.listen(process.env.VCAP_APP_PORT || 3000);

	
}else{
var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
};

