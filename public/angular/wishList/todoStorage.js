/*global todomvc */
'use strict';

/**
* Services that persists and retrieves TODOs from localStorage
*/
app.factory('todoStorage', function ($http) {
	var STORAGE_ID = 'todos-angularjs';

	return {
		get: function () {
            return  $http.get('/getAllWish');
		},

		add: function (wish) {
           return $http.post('/createWish', wish);
		},
        removeOne: function(wish){
            return $http.post('/removeOne', wish);
        }
	};
});
