'use strict';
/**
 * Module dependencies.
 */

// mongoose Connection
require( './dbConnection' );

// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	mongoose = require( 'mongoose' ), //MongoDB integration
	nodemailer = require("nodemailer");
var passport = require('passport');
var app = express();

//Import Service
var RestUserLogin = require('./config/user/RestUserLogin.js');
var RestUserRegister = require('./config/user/restUserRegister.js');
var RestActivateAccount = require('./config/user/restActivateAccount.js');
var RestMenu = require('./config/menu/restMenu.js');
var RestWishList = require('./config/wishList/restWishList.js');





// Configure server
app.configure( function() {
//    app.set('views', __dirname + '/views');
//    app.engine('html', require('ejs').renderFile);
    //parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );



	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
	
	  app.use(express.cookieParser());
	  app.use(express.session({ secret: 'keyboard cat' }));
	  app.use(passport.initialize());
	  app.use(passport.session());


	  //Where to serve static content
//	  app.use( express.static( path.join( application_root, 'site') ) );
	  //perform route lookup based on url and HTTP metho
//    app.use(express.logger());
    app.use(express.static(__dirname + '/public'));
    app.use(express.static('page',__dirname + '/public/page'));
    app.use( app.router );
    app.use(function(req, res) {
            res.sendfile(__dirname + '/public/index.html');
    });

	
});

// Routes
app.get( '/api', function( request, response ) {
	response.send( 'Library API is running' );
});

//// Check for admin middleware, this is unrelated to passport.js
//// You can delete this if you use different method to check for admins or don't need admins
function ensureAdmin(req, res, next) {

        if(req.user && req.user.Role === 'admin')
            next();
        else
            res.send(403);
};
//Routes
    // UserLogin
app.get('/isLogged',RestUserLogin.isLogged);
app.get('/logout', RestUserLogin.logout);
app.post('/logintest',RestUserLogin.logintest);
////    RegisterUser
app.post('/checkEmail',RestUserRegister.checkEmail);
app.post('/checkUsername',RestUserRegister.checkUsername);
app.post('/createUser',RestUserRegister.createUser);
//ActivateUser
app.post('/activateUser',RestActivateAccount.createPassword);
app.post('/changePassword',RestActivateAccount.createPassword);

     //menu
app.get( '/api/getMenu', RestMenu.getMenu);
app.put( '/api/setMenu',RestMenu.setMenu);

app.post('/createWish',RestWishList.addWish);
app.get('/getAllWish',RestWishList.getAllWish);
app.post('/removeOne',RestWishList.removeOne);

//app.get( '/activate/:token',function(req, res) {
//    var token = req.params.token;
//    console.log(token);
//    res.render('activate/' + token); // updated to reflect dir structure
//});
//app.get('/partials/:name', function(req, res){
//    token = req.params.name
//    res.render('partials/' + name)
//});
//app.get('/', function(request, response) {
//    response.render('index.html');
//});
//Start server
if(process.env.VCAP_APP_PORT){
	app.listen(process.env.VCAP_APP_PORT || 3000);

	
}else{
var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
};

