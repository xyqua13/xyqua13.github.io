var app = angular.module("myApp", []); 
app.controller("myCtrl", function($scope) {
    $scope.qs = "";
    $scope.responses = [];
    $scope.mode=false;
    $scope.qsJSON=""
    $scope.addQ = function () {
        $scope.errortext = "";
        totalResponses=0;
        answerError=false;
        jQuery($scope.responses).each(function(){
            totalResponses+=parseInt(this.number);
            //console.log(typeof(this.answer));
            //console.log(this.number);
            if(typeof(this.answer)==="undefined"||!/^\d+$/.test(this.number)){answerError=true;}
        });

        if (!$scope.qIn) {
            $scope.errortext = "ERROR: Must have a question.";
            return;
        }
        else if ($scope.responses.length<3){
            $scope.errortext = "ERROR: Less than 3 answers.";
            return;
        } else if (answerError){
            $scope.errortext = "ERROR: Please enter a valid answer and number for each line.";
            return;
        }
        else{
            if($scope.qs==""){$scope.qs=[];}
            if ($scope.qs.indexOf($scope.qIn.question) == -1) {
                $scope.qs.push({id:$scope.qIn.length,question:$scope.qIn,answers:$scope.responses});
                $scope.responses = [];
                jQuery('#qIn').val("");
                $scope.qsJSON=JSON.stringify($scope.qs);
                console.log($scope.qsJSON);
            }
        }
        
    }
    $scope.removeQ = function (x) {
        $scope.errortext = "";
        $scope.qs.splice(x, 1);
    } 
  
    $scope.addNewChoice = function() {
        if($scope.responses.length<8){
            var newItemNo = $scope.responses.length+1;
            $scope.responses.push({'id':'response'+newItemNo});
        }
    };

    $scope.removeChoice = function() {
        var lastItem = $scope.responses.length-1;
        $scope.responses.splice(lastItem);
    };

    $scope.done = function(){
        if($scope.qs.length>3){
            $scope.mode=true;
            $scope.sqs=$scope.qs[3];
        } else {
                $scope.errortext = "Must have at least 4 Questions";
        } 
    }
    $scope.skip = function(){

        //return $scope.mode;
    }

    $scope.loadJSON = function(){$scope.qs=JSON.parse($scope.jsonLoad);}
});