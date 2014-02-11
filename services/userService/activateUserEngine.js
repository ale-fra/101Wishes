var activatePlayerByToken = function ( req, res, next ){
    UserModel.update({token:req.body.token}, {$set: { active: true }}, function(err){
        if(!err){
            res.send({'status':'ok','msg':'Username activated'});
        }else{
            console.log(err);
            res.send({'status':'ko','msg':'Username not activated'});
        }
    });
};

var changePasswordByToken = function ( req, res, next ){


    UserModel.update({token:req.body.token}, {$set: { password: req.body.password }}, function(err){
        if(!err){
            res.send({'status':'ok','msg':'Username password created'});
        }else{
            console.log(err);
            res.send({'status':'ko','msg':'Username password not created'});
        }

    });

};



function async(arg, callback) {
    console.log('do something with \''+arg+'\', return 1 sec later');
    setTimeout(function() { callback(arg * 2); }, 1000);
}
function final() { console.log('Done', results); }

var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

items.forEach(function(item) {
    async(item, function(result){
        results.push(result);
        if(results.length == items.length) {
            final();
        }
    })
});

module.exports = function() {
    this.response= {
        changePassword:false,
        changesState:false,
        deleteToken:false
    };
    this.activateUser= function(){}
    changePasswordByToken( req, res, next).
}
