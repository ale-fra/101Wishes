//var ActivateUserEngine = require('./activateUserEngine')
//var activateUserEngine = new ActivateUserEngine();
var EmailTrasfert = require('../../config/sendEmail/activateAccount/SendEmailActivate.js');
var passportEnigne = require('./passportEngine.js');
var PassportEnigne = new passportEnigne();
passport = require('passport');


module.exports = function() {

    this.isLogged=  function ( req, res, next ){
        if (req.isAuthenticated()) {
            res.send({'status':'ok','role':req.user.role,'username':req.user.userName}); }
        else{
            res.send({'status':'ko'});

        }
    };
    this.logout = function ( req, res, next ){
       req.logout();
       res.send({'status':'ok','message':'LogOut eseguito'});
    }

    this.userLogin = function ( req, res, next ){
        console.log('before authenticate');
        passport.authenticate('local', function(err, user, info) {
            console.log('authenticate callback');
            if (err) { return res.send({'status':'err','message':err.message}); }
            if (!user) { return res.send({'status':'fail','message':info.message}); }
            req.logIn(user, function(err) {
                if (err) { return res.send({'status':'err','message':err.message}); }
                return res.send({'status':'ok','role':user.role,'username':user.username});
            });
        })(req, res, next);
    }

    this.ensureAdmin = function(req, res, next) {

        if(req.user && req.user.Role === 'admin')
            next();
        else
            res.send(403);
    };

    this.ensureAuthenticated = function(req, res, next) {
        console.log(req.user);
        if (req.isAuthenticated()) { return next(); }
        console.log('not autorized')
        res.send(403);
    }

    this.userByToken = function ( req, res, next ){
        UserModel.findOne({token: req.body.token}, function(err, doc) {
            if (doc){
                res.send({'status':'ok','username':doc.username});
            }else
                res.send({'status':'ko','msg':'Token non valido','description':'controlla se il link è corretto'});
        });

    }
    this.checkUsername = function ( req, res, next ){

        var query = new RegExp(["^",req.body.username,"$"].join(""),"i");
        UserModel.count({username: query}, function(err, doc) {
            if (doc){
                res.send({'status':'ko','msg':'Username already used'});
            }else
                res.send({'status':'ok','msg':'Username free'});
        });
    }
    this.checkEmail = function ( req, res, next ){
        UserModel.count({email: req.body.email}, function(err, doc) {
            if (doc){
                res.send({'status':'ko','msg':'Email already used'});
            }else
                res.send({'status':'ok','msg':'email free'});
        });

    }

    this.createUser = function ( req, res, next ){
        var user = new UserModel({
            email : req.body.email.toLowerCase(),
            username : req.body.username
        });


                user.save( function( err ) {
                    if( !err ) {
                        console.log('user '+ user.username +' created');

                        console.log('http://localhost:4711/activate/'+ user.token )
//                          SendEmail.sendActivateEmail({user.email,user.token},function(err, doc){
                        var SendEmail = new EmailTrasfert(user.email, user.token);

                        SendEmail.sendActivateEmail(function(err, doc){
                            if(!err){
//                            res.send({'status':doc.status,'msg':doc.text});
                                res.send({'status':'ok','msg':'Mail sent'});
                            }else{
//                                res.send({'status':doc.status,'msg':doc.text});
                                res.send({'status':'ko','msg':'Error sending Email'});
                            }

                        });
                    }else{
                        console.log( 'Error savin on db because of : '+err );
                        res.send({'status':'ko','msg':'Error savin on db'});
                    }
                });

    };


    this.activateUser = function ( req, res, next ){


        var activatePlayerByToken = function ( req, res, next ){
            UserModel.update({token:req.body.token}, {$set: { active: true }}, function(err,found){
                if(!err && found){
                    async('activate');
                    next();
                }else if(!found){
                    console.log('User with this token not found');
                    res.send({'status':'ko','msg':'User with this token not found'});
                }else{
                    console.log(err);
                    res.send({'status':'ko','msg':'Username not activated'});
                }
            });
        };
//
        var changePasswordByToken = function ( req, res, next ){
            UserModel.update({token:req.body.token}, {$set: { password: req.body.password }}, function(err,found){
                if(!err && found){
                    async('changePassword');
                    next();
                 }else if(!found){
                    console.log('User with this token not found');
                    res.send({'status':'ko','msg':'User with this token not found'});
                    }else{
                    console.log(err);
                    res.send({'status':'ko','msg':'Username password not created'});
                }
            });
        };
        var destroyUserToken = function ( req, res, next ){
            UserModel.update({token:req.body.token},{$set: {token : ''}}, function(err,found){
                if(!err && found){
                    async('destroyToken');
                    next();
                 }else if(!found){
                    console.log('User with this token not found');
                    res.send({'status':'ko','msg':'User with this token not found'});
                 }else{
                    console.log(err);
                    res.send({'status':'ko','msg':'Username token not destroyed'});
                }
            });
        };





        results={
            activate:false,
            changePassword:false,
            destroyToken:false,
            number : 0
        }

        function series(callbacks, last) {
            var results = [];
            function next() {
                var callback = callbacks.shift();
                if(callback) {
                    callback( function() {
                        next();
                    });
                } else {
                    last(results);
                }
            }
            next();
        }
// Example task
        function async(arg) {
            console.log(arg);
            console.log(new Date().getTime())
            results[arg] = true;
            results.number ++;
        }

        function final() {
            console.log('Done', results);

            if(results.activate && results.changePassword && results.destroyToken)
                res.send({'status':'ok','msg':'UserActivated!'});
            else if(!results.activate)
                res.send({'status':'ko','msg':'Problem activate!'});
            else if(!results.changePassword)
                res.send({'status':'ko','msg':'Problem changePassword!'});
            else if(!results.destroyToken)
                res.send({'status':'ko','msg':'Problem destroyToken!'});
        }

        series([
            function(next) { activatePlayerByToken( req, res, next ) },
            function(next) { changePasswordByToken( req, res, next) },
            function(next) { destroyUserToken( req, res, next) },
//            function(next) { async(4, next); },
//            function(next) { async(5, next); },
//            function(next) { async(6, next); }
        ], final);










//    });
//        response = changePasswordByToken( req, res, next );
//        response= activatePlayerByToken( req, res, next );



//        function series(callbacks, last) {
//            var results = [];
//            function next() {
//                var callback = callbacks.shift();
//                if(callback) {
//                    callback(function() {
//                        results.push(Array.prototype.slice.call(arguments));
//                        next();
//                    });
//                } else {
//                    last(results);
//                }
//            }
//            next();
//        }
//// Example task
//        function async(arg, callback) {
//            var delay = Math.floor(Math.random() * 5 + 1) * 100; // random ms
//            console.log('async with \''+arg+'\', return in '+delay+' ms');
//            setTimeout(function() { callback(arg * 2); }, delay);
//        }
//        function final(results) { console.log('Done', results); }
//
//        series([
//            function(next) { async(1, next); },
//            function(next) { async(2, next); },
//            function(next) { async(3, next); },
//            function(next) { async(4, next); },
//            function(next) { async(5, next); },
//            function(next) { async(6, next); }
//        ], final);
    }
}

