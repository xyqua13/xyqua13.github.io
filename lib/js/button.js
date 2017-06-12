
    app.controller("buttonControl", function($scope) {
        $scope.litInd=[];
        $scope.litIndLit=[]
        $scope.indicatorIN="";
        $scope.isLit=false;

        $scope.addInd= function(){ 
            if($scope.litInd.indexOf($scope.indicatorIN.toUpperCase())== -1)
            {
              $scope.litInd.push($scope.indicatorIN.toUpperCase());
              $scope.litIndLit.push($scope.isLit);
              $scope.indicatorIN="";
              $scope.isLit=false;
            }
        }
        
        $scope.btnTxt="";
        $scope.btnResponse="---"
        $scope.btnShowStrip=false;
        $scope.gaButtonStart=true;
        $scope.theButton = function(color)
        {
            if($scope.gaButtonStart){
                window.dataLayer.push({"event":"trackEvent","category":"The Button","action":"Start"});
                window.dataLayer.push("category":"","action","","label","");
                $scope.gaButtonStart=false;
            }
            $scope.btnTxt="";
            $scope.btnResponse="---"
            $scope.btnShowStrip=false;


            if($scope.btnTxt.toUpperCase()=="ABORT"&&color=="blue")
                {$scope.btnResponse="Press and Hold";$scope.btnShowStrip=true;}
            else if ($scope.batteries>1&&$scope.btnTxt.toUpperCase()=="Detonate")
                {$scope.btnResponse="Press and Immediately Release";$scope.btnShowStrip=false;}
            else if(color=='white'&&$scope.litIndLit[$scope.litInd.indexOf('CAR')]==true)
                {$scope.btnResponse="Press and Hold";$scope.btnShowStrip=true;}
            else if($scope.batteries>2&&$scope.litIndLit[$scope.litInd.indexOf('FRK')]==true)
                {$scope.btnResponse="Press and Immediately Release";$scope.btnShowStrip=false;}
            else if(color=='yellow')
                {$scope.btnResponse="Press and Hold";$scope.btnShowStrip=true;}
            else if(color=='red'&&$scope.btnTxt.toUpperCase()=="HOLD")
                {$scope.btnResponse="Press and Immediately Release";$scope.btnShowStrip=false;}
            else
                {$scope.btnResponse="Press and Hold";$scope.btnShowStrip=true;}
        }
});