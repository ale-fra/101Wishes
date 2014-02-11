function LogOutCtrl($http,$scope,loginService,MessageBoxService) {
		$scope.tryLogOut = function(){
		$http.get('/logout').success(function(data, status, headers, config) {
			$scope.showLoginForm= true;
			$scope.username ='';
			$scope.password ='';
			loginService.setRole('public');
		});
	};
};