var app = angular.module("keepTalkikng", []);
    app.controller("keeptTalkingControl", function($scope) {
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
      
        $scope.basicWireMSG = "-------";
        $scope.basicWires=[];
        $scope.basicWireColors = {'Red': 0,'Blue': 0,'White': 0,'Yellow': 0,'Black': 0}
        $scope.addBasicWire= function (color) {
            $scope.basicWireColors[color]++;
            console.log($scope.basicWireColors[color]);
            if($scope.basicWires.length<6)
            {
                $scope.basicWires.push(color);
                $scope.basicWireCheck();
            }
        }
        $scope.basicWireCheck= function(){
            if($scope.basicWires.length>=3)
            {
                console.log("Wires: ",$scope.basicWires.length);
                console.log($scope.basicWireColors)
                if($scope.basicWires.length==3)
                {
                    console.log("BASIC:3");
                    if($scope.basicWireColors["Red"]==0)
                        {$scope.basicWireMSG="SECOND WIRE";}
                    else if ($scope.basicWires[2]=="White")
                        {$scope.basicWireMSG="LAST WIRE";}
                    else if ($scope.basicWireColors["Blue"]>1)
                        {$scope.basicWireMSG="LAST BLUE";}
                    else
                        {$scope.basicWireMSG="LAST WIRE";}
                    
                }
                else if($scope.basicWires.length==4)
                {
                    console.log("BASIC:4");
                     if($scope.basicWireColors["Red"] > 1 && !$scope.lastDigEven)
                         {$scope.basicWireMSG="LAST RED WIRE";}
                     else if($scope.basicWires[3]=="Yellow"&&$scope.basicWireColors["Red"]==0)
                        {$scope.basicWireMSG="FIRST WIRE";}
                    else if($scope.basicWireColors["Blue"]==1)
                        {$scope.basicWireMSG="FIRST WIRE";}
                    else if($scope.basicWireColors["Yellow"]>1)
                        {$scope.basicWireMSG="LAST WIRE";}
                    else
                        {$scope.basicWireMSG="SECOND WIRE";}
                }   
                else if($scope.basicWires.length==5)
                {
                    console.log("BASIC:5");
                    if($scope.basicWires[4]=="Black"&& !$scope.lastDigEven)
                        {$scope.basicWireMSG="FOURTH WIRE";}
                    else if ($scope.basicWireColors["Red"]==1&&$scope.basicWireColors["Yellow"]>1)
                        {$scope.basicWireMSG="FIRST WIRE";}
                    else if ($scope.basicWireColors["BLACK"]==0)
                        {$scope.basicWireMSG="SECOND WIRE";}
                    else
                        {$scope.basicWireMSG="FIRST WIRE";}
                }
                else if($scope.basicWires.length==6)
                {
                    console.log("BASIC:6");
                     if($scope.basicWireColors["Yellow"]==0&& !$scope.lastDigEven)
                        {$scope.basicWireMSG="THIRD WIRE";}
                    else if ($scope.basicWireColors["Yellow"]==1&&$scope.basicWireColors["White"]>1)
                        {$scope.basicWireMSG="FOURTH WIRE";}
                    else if ($scope.basicWireColors["Red"]==0)
                        {$scope.basicWireMSG="LAST WIRE";}
                    else
                        {$scope.basicWireMSG="FOURTH WIRE";}
                }

            }
            else
            {
                 $scope.basicWireMSG="--------"
            }
        }

        $scope.removeItem = function (x) {
            $scope.basicWireColors[$scope.basicWires[x]]--;
            //console.log($scope.basicWireColors[$scope.basicWires[x]]);
            $scope.basicWires.splice(x, 1);
            $scope.basicWireCheck();
        }
        $scope.checkSerial = function()
        {
            $scope.vowles=0;

            $scope.lastDigEven=null;
            $scope.serialSplit=$scope.serial.split('');
            if($scope.serialSplit[$scope.serialSplit.length-1]%2 == 0)
                $scope.lastDigEven=true;
            else
                $scope.lastDigEven=false;
            for(i=0;i<$scope.serialSplit.length;i++)
                if( ['a', 'e', 'i', 'o', 'u'].indexOf($scope.serialSplit[i]) !== -1)
                    $scope.vowles++;
          $scope.basicWireCheck();
        }
    });