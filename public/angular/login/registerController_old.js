function RegisterCtrl($http,$scope,MessageBoxService,$timeout) {

    $("#registerPassword").focus(function () {
        $("#registerPassword").click();
    });
    $("#registerEmail").focus(function () {
        $("#registerEmail").click();
    });


    $scope.registerFormState=true;
    $scope.showSocialSircle=true;
    $scope.msgText="";
    $scope.showMessageBox=false;

    var value=1;
    var type='danger';
    $scope.dynamic = value;
    $scope.dynamicObject = {
        value: value,
        type: type
    };

    var promiseTimeout;


	$scope.checkEmail = function(email){

        $timeout.cancel(checkEmailTimeout);

        if(email !=""){

            if(validateEmail(email)){


            checkEmailTimeout = $timeout(function() {

                $http({
                    data : {
                        'email': email
                    },
                    url: '/checkEmail',
                    method: 'POST',
                    dataType: 'JSON'
                }).
                    success(function(data, status, headers, config) {
                    if(data.status==="ok"){
                        ShowMessageBox(false)
                        $scope.emailClassState="success";

                        console.log(data.msg + " so show circle");

                    }else{
                        $scope.emailClassState="error";
                        ShowMessageBox(true,data.msg)
                        console.log(data.msg);
                    }


                });
            }, 250 );



            }else{
                checkEmailTimeout = $timeout(function() {
                    $scope.emailClassState="error";
                    ShowMessageBox(true,"Email format not valid")

                   console.log('format Email not valid');
                }, 1500 );

            };
        }else{
            console.log("show circle");
            ShowMessageBox(false);
            $scope.emailClassState="";
        };

        ValidateForm();
	};

    validateEmail= function(email){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    ShowMessageBox=function(state,msg){
        if(state){
            $scope.showSocialSircle=false;
            $scope.showMessageBox=true;
            $scope.showComplexityBar=false;
            $scope.msgText=msg
        }else{
            $scope.showSocialSircle=true;
            $scope.showMessageBox=false;
            $scope.showComplexityBar=false;
            $scope.msgText="";
        }
    };

    ShowComplexityBar= function(state,percentual){
        if(state){
            $scope.showSocialSircle=false;
            $scope.showComplexityBar=true;
            $scope.showMessageBox=false;

            if (percentual < 50) {
                $scope.passwordClassState='error';
                type = 'danger';
            } else if (percentual < 99) {
                type = 'warning';
                $scope.passwordClassState='error';
            } else if (percentual > 99) {
                type = 'success';
                $scope.passwordClassState="success"
            }

            $scope.dynamicObject = {
                value: percentual,
                type: type
            };
        }else{
            $scope.showSocialSircle=true;
            $scope.showMessageBox=false;
            $scope.showComplexityBar=false;

        }


    }

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


        ShowComplexityBar(true,complexity);
        $scope.PasswordMatch($scope.password,$scope.passwordConfirm,false);
        if(password=="")
            $scope.passwordClassState="";

        ValidateForm();



    }
        $scope.ShowSocialSircle =function(){
        $scope.showSocialSircle=true;
        $scope.showMessageBox=false;
        $scope.showComplexityBar=false;
        };


    $scope.PasswordMatch=function(password,passwordConfirm,showMsg){


        $timeout.cancel(checkEmailTimeout);

        if(passwordConfirm!="" && passwordConfirm!= undefined ){


            if(password != passwordConfirm) {
                checkEmailTimeout = $timeout(function() {
                    if(showMsg!=false)
                        ShowMessageBox(true,"Passwords doen't match");
                    $scope.passwordConfirmClassState="error";

                },500);
            }else{
                ShowMessageBox(false)
                $scope.passwordConfirmClassState="success";
            }
        }else{
            $scope.ShowSocialSircle();
            $scope.passwordConfirmClassState="";
        }
        };




    ValidateForm=function(){
        if($scope.passwordClassState=="success" && $scope.emailClassState=="success" && $scope.passwordConfirmClassState=="success" )
            $scope.registerFormState=false;
        else
            $scope.registerFormState=true;
    }


    $scope.doLogin=function(email,password){

        $http({
            data : {
                'email': email,
                'password' : password

            },
            url: '/createUser',
            method: 'POST',
            dataType: 'JSON'
        }).
            success(function(data, status, headers, config) {
                if(data.status==="ok"){
                    console.log(data.msg + " so show circle");
                }else{
                    console.log(data.msg);
                }


            });
        $scope.email="";
        $scope.passwordConfirm="";
        $scope.password="";
        $('.login>a')[0].click();

    }

};