module.exports = function() {
    UserModel = require('./dbSchemaUser.js');
    passport = require('passport');
    LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function(userMail, password, done) {
            console.log('called');
            UserModel.findOne({ $or:[ {'username':userMail}, {'email':userMail} ]}, function(err, user) {

// console.log('find: err'+ err +'  user' + user );
                if (err) { return done(err); }
                if (!user) {
                    console.log('Incorrect username.');
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.active) {
                    console.log('User not active');
                    return done(null, false, { message: 'User not active.' });
                }
                if (user.password != password) {
                    console.log('Incorrect password.');
                    return done(null, false, { message: 'Incorrect password.' });
                }
                console.log('ci siamo quasi.');
                return done(null, user);
            });
        }
    ));

//Simple route middleware to ensure user is authenticated.  Otherwise send to login page.


// Check for admin middleware, this is unrelated to passport.js
// You can delete this if you use different method to check for admins or don't need admins

}