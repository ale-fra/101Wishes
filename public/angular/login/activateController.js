function ActivateCtrl($http,$scope,$routeParams,MessageBoxService,$location) {
    $scope.errorHex=false;
    $scope.successToken=false;
    var token = $routeParams.token;
	var init = function () {
        if(token.length==40){
            $scope.successToken=true;
            $scope.errorHex=false;
            validateToken()
        }else{
            $scope.errorHex=true;
            $scope.successToken=false;
            $scope.msgText = "Token non valido" ;
            $scope.msgDescription ="controlla se il link è corretto";
        }
	};
	// and fire it after definition

    $scope.validatePassword = function(password){
        if(password==undefined)
            password="";
        var hasUpperCase = /[A-Z]/.test(password),
            hasLowerCase = /[a-z]/.test(password),
            hasNumbers = /\d/.test(password),
            hasNonalphas = /\W/.test(password),
            complexity = 0,
            passwordLength = password.length;

        if(passwordLength>8)
            passwordLength=8;
        if(passwordLength==undefined)
            passwordLength=0;

        complexity = passwordLength * 12.5;

        if(!hasUpperCase)
            complexity = complexity -25
        if(!hasLowerCase)
            complexity = complexity -25
        if(!hasNumbers)
            complexity = complexity -25
        if(hasNonalphas)
            complexity = complexity +25


        if(complexity>100)
            complexity=100;
        if(complexity<=0)
            complexity=1;


        SetComplexityBar(complexity);
//        $scope.PasswordMatch($scope.password,$scope.passwordConfirm,false);
//        if(password=="")
//            $scope.passwordClassState="";

//        ValidateForm();
    }
    SetComplexityBar= function(percentual){
        if (percentual < 50) {
            $scope.passwordClassState='error';
            type = 'bar-danger';
        } else if (percentual < 99) {
            type = 'bar-warning';
            $scope.passwordClassState='error';
        } else if (percentual > 99) {
            type = 'bar-success';
            $scope.passwordClassState="success"
        }
        percentual=percentual+'%';
        $scope.type = type;
        $scope.percentual = percentual;
    }

    validateToken = function(){
        var dataRequest = {'token': token };
        $http.post('/validateToken', dataRequest).success(function(data){
            if(data.status=="ok"){
                $scope.msgText = "Benvenuto!" ;
                $scope.msgDescription ="Compila i campi qui sotto!";

            }else{
                $scope.msgText = data.msg;
                $scope.msgDescription =data.description;

            }
        });

    };

    $scope.changePassword  = function(password){
        var dataRequest = {'token': token,'password':password};
        $http.post('/changePassword', dataRequest).success(function(data){
            if(data.status=="ok"){
                MessageBoxService.setMessageBox('alert-success','Password settata','effettua il login!');

            }else{

                MessageBoxService.setMessageBox('alert-alert','Qualcosa è andato storo','contatta un admin');
            }
            $scope.confirmPassword='';
            $scope.password='';
            $location.path( "/home" );
        });
    }

    init();
};