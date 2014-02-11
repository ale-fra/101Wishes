var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var Crypto = require('crypto');
//Schema



var User = new Schema({
//    UserName: String,
    email: { type: String,  required: true , unique: true },
    username: { type: String,  required: true , unique: true },
    passWord:{ type: String,  default: '' },
    role: { type: String,  default: 'user' },
    active:  { type: Boolean,  default: false },
    token: { type: String,  default: Crypto.randomBytes(20).toString('hex') },
    dtCreate: { type: Number, default: new Date().getTime()  } ,
    wishList: [];
});

//Models
module.exports =  mongoose.model( 'User', User );