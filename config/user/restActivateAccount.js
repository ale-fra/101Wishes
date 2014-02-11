var userEngine = require('../../services/userService/userEngine.js');
var UserEngine = new userEngine();

exports.validateToken = UserEngine.userByToken;
exports.createPassword = UserEngine.activateUser;
