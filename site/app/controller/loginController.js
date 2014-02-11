function LoginCtrl($http,$scope,loginService,MessageBoxService) {
	
	
	
	$scope.tryLogOut = function(){
		$http.get('/logout').success(function(data, status, headers, config) {
			$scope.showLoginForm= true;
			$scope.username ='';
			$scope.password ='';
			loginService.setRole('public');
		});
	}
	$scope.tryLogin = function(username,password){
		$http({
    	   	data : { 
    	        'username': username, 
    	        'password': password // <-- the $ sign in the parameter name seems unusual, I would avoid it
    	    },
            url: '/logintest',
            method: 'POST',
            dataType: 'JSON'
        })
        .success(function(data, status, headers, config) {
           console.log(data);
           if(data.status==="ok"){
        	   MessageBoxService.setMessageBox('alert-success','Login effettuato','Benvenuto '+ data.username);
//        	   MessageBoxService.setChanged();
	           loginService.setRole(data.role);
	           $scope.showLoginForm= false;
	           $scope.username = data.username;
           }else{
        	   MessageBoxService.setMessageBox('alert-error',data.message,'');
//        	   MessageBoxService.setChanged();
//        	   MessageBoxService.isChanged();

        	   
           }
           $scope.password ='';
          });
		
	};
	// at the bottom of your controller
	var init = function () {
		$http.get('/isLogged').success(function(data, status, headers, config) {
	           if(data.status=='ok'){
	           loginService.setRole(data.role);
	           $scope.showLoginForm= false;
	           $scope.username = data.username;
	           }else{
	           $scope.showLoginForm= true;
	           }
	          });
	};
	// and fire it after definition
	init();
};