var userEngine = require('../../services/userService/userEngine.js');
var UserEngine = new userEngine();

exports.isLogged = UserEngine.isLogged;
exports.logout = UserEngine.logout ;
exports.logintest = UserEngine.userLogin ;
