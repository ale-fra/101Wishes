function menuConfigCtrl($location,$scope, menuFactory,loginService,MessageBoxService) {    
//      in my app I call a rest service here i can't xD
	menuFactory.getMenu(loginService.getRole()).success(function(data){
		$scope.menuConfig = data;
	});
	
	$scope.sortItems = {
            options: {
				handle: '.handle',
                axis: 'y',
                cursor: 'move',
                placeholder: 'ui-state-highlight'
            },
			
            items: $scope.menuConfig
        };
        $scope.$on('sortcreate', function (event, ui) {
            console.log('sortItems:', $scope.sortItems);
        });
        $scope.$on('sortupdate', function (event, ui) {
			
                var uiArray = $(".table-hover tbody").sortable('toArray');
                for (var i = 0; i < $scope.menuConfig.length; i++) {
                    $scope.menuConfig[i].order = uiArray.indexOf($scope.menuConfig[i]._id) + 1;
                }
                $scope.$apply();
            
		
            console.log('ui:', ui);
        });
        
        $scope.setActive = function(item){
        	angular.forEach($scope.menuConfig, function(menuItems){
        		menuItems.active=false;
        	});
        	item.active= true;
        };
        $scope.startEditing = function(item){
            item.editing=true;
            $scope.editedItem = item;
        };
            
        $scope.doneEditing = function(item){
            item.editing=false;
            $scope.editedItem = null;
        };
        $scope.salva = function(){
//        	menuFactory.saveMenu($scope.menuConfig);
        	menuFactory.saveMenu($scope.menuConfig).
        	success(function(data){
         	   MessageBoxService.setMessageBox('alert-success','Menu salvato');
        	}).
        	error(function(data){
        		 MessageBoxService.setMessageBox('alert-error','Errore Salvataggio menu','non hai i permessi sufficenti');
        	});
        	
        };
        $scope.add = function(){
        	var toAdd={"Class" : "icofont-dashboard", "Title" : "",
        		    "order" : 99,"Permesso" : ["all"]
        		};
//        	
        	$scope.menuConfig.push(toAdd);
        };


}

