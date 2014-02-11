function RegisterCtrl($http,$scope,MessageBoxService,$timeout) {

    $("#registerUsername").focus(function () {
        $("#registerUsername").click();
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

    var checkEmailTimeout;


    $scope.checkEmail = function(email){

        $timeout.cancel(checkEmailTimeout);

        if(email!= undefined && email!=""){

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
                            ValidateForm();


                        });

                }, 250 );



            }else{
                checkEmailTimeout = $timeout(function() {
                    $scope.emailClassState="error";
                    ShowMessageBox(true,"Email format not valid")

                    console.log('format Email not valid');
                    ValidateForm();
                }, 1500 );

            };
        }else{
            console.log("show circle");
            ShowMessageBox(false);
            $scope.emailClassState="";
        };

        ValidateForm();
    };






    var checkUserTimeout;

    $scope.checkUser = function(username){

        $timeout.cancel(checkUserTimeout);

        if(username!= undefined && username!=""){
//            username= username.toLowerCase();

            if(validateUser(username)){
                checkUserTimeout = $timeout(function() {

                    $http({
                        data : {
                            'username': username
                        },
                        url: '/checkUsername',
                        method: 'POST',
                        dataType: 'JSON'
                    }).
                        success(function(data, status, headers, config) {
                            if(data.status==="ok"){
                                ShowMessageBox(false)
                                $scope.usernameClassState="success";

                                console.log(data.msg + " so show circle");

                            }else{
                                $scope.usernameClassState="error";
                                ShowMessageBox(true,data.msg)
                                console.log(data.msg);
                            }
                            ValidateForm();


                        });

                }, 250 );



            }else{
                checkUserTimeout = $timeout(function() {
                    $scope.usernameClassState="error";
                    ShowMessageBox(true,"Username format not valid")
                    console.log('format checkUsername not valid');
                    //TODO toltip with motivation
                    ValidateForm();
                }, 1500 );

            };
        }else{
            console.log("show circle");
            ShowMessageBox(false);
            $scope.usernameClassState="";

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




    $scope.ShowSocialSircle =function(){
        $scope.showSocialSircle=true;
        $scope.showMessageBox=false;
        $scope.showComplexityBar=false;
    };




    validateUser=function(user){
        var re = /^[a-zA-Z0-9\-_]{3,30}$/;
        return re.test(user);

    }

    ValidateForm=function(){
        console.log('validate');
        if($scope.usernameClassState=="success" && $scope.emailClassState=="success")
            $scope.registerFormState=false;
        else
            $scope.registerFormState=true;
    }

   var cleanForm = function(){
        $scope.email="";
        $scope.username="";
        $scope.usernameClassState="";
        $scope.emailClassState="";
        ValidateForm();
        var target = angular.element('#singinFormLi');
        target.removeClass('open')
    };

    $scope.createUser=function(email,username){

        console.log(email +"  "+ username);

        $http({
            data : {
                'email': email,
                'username' : username

            },
            url: '/createUser',
            method: 'POST',
            dataType: 'JSON'
        }).
        success(function(data, status, headers, config) {
            if(data.status==="ok"){
                console.log(data.msg + " so show circle");
                cleanForm()
            }else{
                console.log(data.msg);
                cleanForm();
            }
        }).error(function(){cleanForm()});



    }
};