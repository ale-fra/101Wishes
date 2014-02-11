var app =angular.module('app',['ui.bootstrap.progressbar']).
    directive('ngBlur', function() {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                element.bind('blur', function () {
                    scope.$apply(attrs.ngBlur);
                });
            }
        };
    }).
    directive('ngFocus', ['$parse', function($parse) {
        return function(scope, element, attr) {
            var fn = $parse(attr['ngFocus']);
            element.bind('focus', function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
        }
    }]).
    service('loginService', function() {
        role = 1;
        user ="";
        return{
            setRole: function(ruolo,username){

                if(ruolo=="admin"){
                    role= 3;
                    user=username;
                }
                if(ruolo=="user"){
                    role= 2;
                    user=username;
                }
                if(ruolo=="public"){
                    role=1;
                    user ="";
                }

            },
            getRole:function(){
                return role;
            }
        };
    });