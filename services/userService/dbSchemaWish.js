var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var Wish = new Schema({
//    UserName: String,
    title: { type: String,  required: true },
    completed:  { type: Boolean,  default: false },
    dtCreate: { type: Number, default: new Date().getTime()  }
});

module.exports =  mongoose.model( 'Wish', Wish );