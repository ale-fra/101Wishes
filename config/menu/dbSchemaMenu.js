var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

//Schema
var Menu = new Schema({
    Class : String,
    Permesso : Number,
    Title : String,
    Url : String,
    subMenu : [],
    order : Number
});
//Models

module.exports = mongoose.model( 'Menu', Menu );
