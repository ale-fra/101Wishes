function wishListCtrl($scope, $location, todoStorage, filterFilter,loginService,MessageBoxService) {
    var role =loginService.getRole();
    if(role==1)
        $location.path('/home');

    var todos = undefined;


    $scope.todos = todoStorage.get().success(function(data){
        todos = $scope.todos = data.wishList;
    });

    $scope.newTodo = '';
    $scope.editedTodo = null;

//    $scope.$watch('todos', function (newValue, oldValue) {
//        $scope.remainingCount = filterFilter(todos, { completed: false }).length;
//        $scope.completedCount = todos.length - $scope.remainingCount;
//        $scope.allChecked = !$scope.remainingCount;
//        if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
//            todoStorage.put(todos);
//        }
//    }, true);
//


    $scope.location = $location;

//    $scope.$watch('location.path()', function (path) {
//        $scope.statusFilter = (path === '/active') ?
//        { completed: false } : (path === '/completed') ?
//        { completed: true } : null;
//    });

    $scope.addTodo = function () {
        var newTodo = $scope.newTodo.trim();
        if (!newTodo.length) {
            return;
        }
        newTodo = {
            title: newTodo,
            completed: false
        };
        todoStorage.add(newTodo).success(function(data){
                if(data.status=="ok"){
                    todos.push(data.wish);
                }else{
                    MessageBoxService.setMessageBox('alert-alert','Problema imprevisto','scusaci');                }
            });

        $scope.newTodo = '';
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        $scope.originalTodo = angular.extend({}, todo);
    };

    $scope.doneEditing = function (todo) {
        $scope.editedTodo = null;
        todo.title = todo.title.trim();

        if (!todo.title) {
            $scope.removeTodo(todo,$scope.originalTodo);
        }
    };

    $scope.revertEditing = function (todo) {
        todos[todos.indexOf(todo)] = $scope.originalTodo;
        $scope.doneEditing($scope.originalTodo);
    };

    $scope.removeTodo = function (todo,todoNotEdited) {

        if(todoNotEdited !== undefined){ todo=todoNotEdited;}
        todoStorage.removeOne(todo)
        todos.splice(todos.indexOf(todo), 1);
    };

    $scope.clearCompletedTodos = function () {
        $scope.todos = todos = todos.filter(function (val) {
            return !val.completed;
        });
    };

    $scope.markAll = function (completed) {
        todos.forEach(function (todo) {
            todo.completed = completed;
        });
    };
};