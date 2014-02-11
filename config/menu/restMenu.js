var MenuList = require('./dbSchemaMenu.js');
var url = require('url');
exports.getMenu = function ( req, res, next ){
    var url_parts = url.parse(req.url,true);
    var role = url_parts.query['role'];
    console.log('{"Permesso": {$lte:'+ role+'}');
    return MenuList.find({"Permesso": {$lte: role}}, function( err, MenuList ) {
        if( !err ) {
            //console.log(MenuList);
            return res.send( MenuList );
        } else {
            return console.log( err );
        }
    });

};


var UpdateSingleMenu=function(id, obj){

    if(id=== undefined){


        var menu = new MenuList({

            Class:obj.Class,
            Title:obj.Title,
            order:obj.order,
            Url: "/"+obj.Title.toLowerCase(),
//			subMenu:obj.subMenu;
            Permesso: obj.Permesso
        });
        return menu.save( function( err ) {
            if( !err ) {
                console.log( 'menu created' );
            } else {
                console.log( err );
            }
        });
    }else



        MenuList.findById(id, function( err, menu ) {
            menu.Class=obj.Class;
            menu.Title=obj.Title;
            menu.Url= "/"+obj.Title.toLowerCase();
            menu.order=obj.order;
            menu.subMenu=obj.subMenu;
            menu.Permesso=obj.Permesso;

            return menu.save( function( err ) {
                if( !err ) {
                    console.log( 'menu updated' );
                } else {
                    console.log( err );
                }

            });

        });

};
exports.setMenu = function ( req, res, next ){



    for(var i =0;i<req.body.length; i++){
        UpdateSingleMenu(req.body[i]._id,req.body[i]);


    }
    res.send('');

};