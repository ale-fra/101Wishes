var Sys = require('../../SysVar.js');
exports.text = function(email,token){
    return "Thank you for joining 101Wishes!" +
        "Please click the following URL to activate your account:" +
        +Sys.domainUrl+"/activate/"+token +
        "If clicking the URL above does not work, copy and paste the URL into a browser window." +
        "PDI";
}
exports.html = function(email,token){
    return "<div id=\":1w3\" style=\"overflow: hidden;\">Thank you for joining 101Wishes!" +
        "<br>" +
        " <br>"  +
        "Please click the following URL to activate your account:<br>"+
        "<a href="+Sys.domainUrl+"/activate/"+token+" target=\"_blank\">http://localhost:4711/activate/"+token+"</a><br>"+
        "<br>"+
        "If clicking the URL above does not work, copy and paste the URL into a browser window.<br>"+
        "<br>"+
        "<br>"+
        "PDI";
}
