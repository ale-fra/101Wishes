function MenuCtrl($location,$scope,loginService) {
    $scope.home=true;
    $scope.about=false;
    $scope.select=function(item){
        menuActive(item);
    };

    $scope.$watch(function() { return loginService.getRole();}, function(newVal,oldVal) {
        $scope.role = newVal;
        if(newVal!=1)
            $scope.logged= true;
        else
            $scope.logged= false;

    });



    var menuActive = function (item) {
        switch(item)
    {
        case "/":
            $scope.home=true;
            $scope.aboutUs=false;
            break;
        case "/aboutUs":
            $scope.home=false;
            $scope.aboutUs=true;
            break;
            case "/activate/":
            $scope.home=false;
            $scope.aboutUs=false;
            break;
        default:
            $scope.home=false;
            $scope.aboutUs=false;
            break;
    }

    }


    var init = function () {
        var path=$location.path();
        if(path.indexOf('/')!=path.lastIndexOf('/'))
            path=path.substring(0,path.lastIndexOf('/')+1) ;
        menuActive(path);



    };
    // and fire it after definition
    init();


}