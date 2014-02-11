var userEngine = require('../../services/userService/userEngine.js');
var UserEngine = new userEngine();

exports.checkEmail = UserEngine.checkEmail ;
exports.checkUsername = UserEngine.checkUsername ;
exports.createUser = UserEngine.createUser;

