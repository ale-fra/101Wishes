
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
UserModel = require('./dbSchemaUser.js');

var Wish = require('./dbSchemaWish.js');

module.exports = function() {

    this.addWhis= function( req, res, next ){


        var wish = new Wish({
            title: req.body.title,
        });
        console.log(wish);

        UserModel.update({_id : req.user._doc._id},{$push: {wishList:wish}}, function(err,found){
            console.log(err);
            console.log(found);
            if(!err && found )
                res.send({'status':'ok','msg':'Desiderio aggiunto','wish':wish});

            //TODO
        });


    }

    this.getAllWish= function( req, res, next ){
        UserModel.findOne({_id : req.user._doc._id}, function(err,found){
            if(err){
                console.log(err)
             res.send({'status':'ko'});
            }else if(!err && found ){
                console.log('desideri di '+found);
               res.send({'status':'ok','wishList':found._doc.wishList});
            }
        });
    }
    this.removeOne= function(req, res, next){

        /*

         query.elemMatch(path, criteria)
         query.where(path).elemMatch(criteria)


         */

        UserModel.findOneAndUpdate({_id : req.user._doc._id},{ $pull: {wishList: { _id : req.body._id}}},function(err,found){
            if(err){
                console.log(err)
                res.send({'status':'ko'});
            }else if(!err && found ){
                console.log('desiderio eliminato :'+req.body);
                res.send({'status':'ok','msg':'desiderio eliminato'});
            }
        });
    }
//        UserModel.findOne({_id : req.user._doc._id}).
//            select('wishList').
//           // $where('_id' == req.body._id).
//
//            exec(function(err,found){
//                if(err){
//                    console.log(err);
//                    res.send({'status':'ko'});
//                }else if(!err && found ){
//                    console.log('desideri di '+found);
//                   // res.send({'status':'ok','wishList':found._doc.wishList});
//                }
//            });


//            function(err,found){
//                if(err){
//                    console.log(err)
//                    res.send({'status':'ko'});
//                }else if(!err && found ){
//                    console.log('desideri di '+found);
//                    res.send({'status':'ok','wishList':found._doc.wishList});
//                }
//            }

//    }
}