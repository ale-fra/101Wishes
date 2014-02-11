app.service('MessageBoxService', function() {
	cambiata = '';
	messageBox ={};
	
    return {
    	
    	isChanged: function(){
			return cambiata;
		},
        getMessageBox: function(){
        	return messageBox;
        },
        setMessageBox:function(type,msgStrong,msg,timeOut){
        	messageBox ={'type' :"alert-success",'timeOut': 5000};
        	if(type!=undefined)
        		messageBox.type=type;
        	if(msgStrong!=undefined)
        		messageBox.msgStrong=msgStrong;
        	
        	if(msg!=undefined)
        		messageBox.msg=msg;
			if(timeOut!=undefined)
        		messageBox.timeOut=timeOut;
			cambiata=new Date().getTime();
        }
    };
});


function MessageBoxCtrl($http,$scope,$timeout,MessageBoxService) {
//	messageBox ={'type' :"alert-success",'timeOut': 5000,'msgStrong':'Yepp','msg':'default message'};
	
        var promiseTimeout;
	    $scope.showMessageBox=false;
	displayMessage= function (messageBox){
        $timeout.cancel(promiseTimeout);

        $scope.type= messageBox.type;
		$scope.msgStrong= messageBox.msgStrong;
		$scope.msg= messageBox.msg;
        $scope.showMessageBox=true;
		if(messageBox.timeOut!=false)
            promiseTimeout = $timeout(function() {
                $scope.showMessageBox=false;
                $('#headerMessageBox').css('opacity',0);
            }, messageBox.timeOut);


$timeout(function() {setMargin()}, 1);


		
		
	};
	
	//centriamo il div//
	setMargin= function(){
	var larghezza = $('body').width();
    for(i= $('#headerMessageBox').width();$('#headerMessageBox width').height()<25;i--)
        $('#headerMessageBox').width(i);
    $('#headerMessageBox').width($('#headerMessageBox').width()+5);
	var headerMessageBox = $('#headerMessageBox').width();
	
	var marginLeft = (larghezza -headerMessageBox)/2;
	$('#headerMessageBox').css('margin-left',marginLeft+'px');
        $('#headerMessageBox').css('opacity',0.8);
    };
	$scope.$watch(function() { return MessageBoxService.isChanged();}, function(newVal,oldVal) {
        if(newVal!=oldVal)
		    displayMessage(MessageBoxService.getMessageBox());
		
		
	});

    $scope.stopTimer = function(){
        $timeout.cancel(promiseTimeout);
    }
	
};


