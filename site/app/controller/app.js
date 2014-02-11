var app =angular.module('app',['ui','ui.bootstrap.dropdownToggle','ui.directives.sortable','ui.bootstrap.tabs'])
  	.directive('dividerAppend', function ( $compile) {
	return {
	      restrict: 'A',
	      link: function (scope, element, attrs) {
	    	  if(scope.$index!=0){
	    	  var contentTr = angular.element('<li class=divider></li>');
	    	  $(contentTr).insertBefore(element);
	          $compile(contentTr)(scope);
	    	  }
	      }
	    };
	})
	.directive('ngBlur', function() {
	  return function( scope, elem, attrs ) {
	    elem.bind('blur', function() {
	      scope.$apply(attrs.ngBlur);
	    });
	  };
	})
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
	.directive('ngFocus', function( $timeout ) {
	  return function( scope, elem, attrs ) {
	    scope.$watch(attrs.ngFocus, function( newval ) {
	      if ( newval ) {
	        $timeout(function() {
	          elem[0].focus();
	        }, 0, false);
	      }
	    });
	  };
	}).
	service('loginService', function() {
		role = 1;
		return{
			setRole: function(ruolo){
				
				if(ruolo=="admin")
					role= 3;
				if(ruolo=="user")
					role= 2;
				if(ruolo=="public")
					role=1
				
			},
			getRole:function(){
				return role;
			}
		};
	}).
	service('menuFactory', function($http,$location) {  
		changed = false;
	return{

		saveMenu : function(menuToSave){
			changed = true;
		       return $http({
		    	   	data : menuToSave,
		            url: '/api/setMenu',
		            method: 'PUT',
		            dataType: 'JSON'
		        });
		},
		setChanged: function(){
			changed = true;
		},
		isChanged: function(){
			return changed;
		},
		getMenu : function(role){
			changed = false;
		       return $http({
		            url: '/api/getMenu',
		            method: 'GET',
		            params:{'role': role }
		        });
		},
		findActive : function(menu){
			for(var subString=$location.path();subString.lastIndexOf("/")>0;subString=subString.substring(0,subString.lastIndexOf("/"))){};
			
			
			var hashPath = subString || '/';
			angular.forEach(menu, function(item) {
		        if (hashPath === item.Url){
		        	active = [];
		        	if(item.subMenu.length)
						active.push(item);
		            item.active = true;
		        }else
		            item.active = false; 
	        });
			return menu;
       	},
       	
		
		
	};
});



function MenuCtrl($location,$scope, menuFactory,loginService) {        
//      in my app I call a rest service here i can't xD
//	menuFactory.getMenu().success(function(data){
//		$scope.menu = menuFactory.findActive(data);
//	   }); 
	
//	$scope.menu = menuFactory.findActive(menuFactory.getMenuNOREST());
	
	
	$scope.setActive = function(url){
		$location.path(url);
		menuFactory.findActive($scope.menu);
	};
	
	$scope.isCollapsed = false;

  $scope.path = function(){
    //in my app it's work currectly, here i don't know how to make 
    		return $location.path() || "/home";
	};
	
	
	 
	
	$scope.$watch(function() { return loginService.getRole();}, function(newVal,oldVal) {
		$scope.role = newVal;
		menuFactory.setChanged();
	});
	   $scope.$watch(function() { return menuFactory.isChanged();}, function(newVal,oldVal) {
		 	$scope.menu = menuFactory.getMenu(loginService.getRole()).success(function(data){
			$scope.menu = menuFactory.findActive(data);
		   }); 
	   }); // initialize the watch
	
}

