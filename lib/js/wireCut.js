
    app.controller("wireCutControl", function($scope) {
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
        $scope.gaBasicStart=true;
        $scope.addBasicWire= function (color) {

            if($scope.gaBasicStart){
                window.dataLayer.push({"event":"trackEvent","category":"Basic Wires","action":"Start"});
                window.dataLayer.push("category":"","action":"":"label","");
                $scope.gaBasicStart=false;
            }
            window.dataLayer.push({"event":"trackEvent","category":"Basic Wires","action":"Add Wire","label":color});
            window.dataLayer.push("category":"","action":"":"label","");

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
            window.dataLayer.push({"event":"trackEvent","category":"Basic Wires","action":"Remove Wire","label":$scope.basicWires[x]});
            window.dataLayer.push("category":"","action":"":"label","");
            if($scope.basicWires.length==1){
                window.dataLayer.push({"event":"trackEvent","category":"Basic Wires","action":"Reset"});
                window.dataLayer.push("category":"","action":"":"label","");
                $scope.gaBasicStart=true;
            }
            $scope.basicWireColors[$scope.basicWires[x]];
            //console.log($scope.basicWireColors[$scope.basicWires[x]]);
            $scope.basicWires.splice(x, 1);
            $scope.basicWireCheck();
        }
        $scope.resetBasicWire = function(){
             $scope.basicWires=[];
             $scope.basicWireMSG="--------";
             $scope.basicWireColors = {'Red': 0,'Blue': 0,'White': 0,'Yellow': 0,'Black': 0}
             $scope.gaBasicStart=true;
             window.dataLayer.push({"event":"trackEvent","category":"Basic Wires","action":"Reset"});
             window.dataLayer.push("category":"","action":"":"label","");
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










        $scope.advancedWireResult = "---"
        $scope.addComplexWire = function()
        {
            var lastDigitSerial = Number($scope.serial.slice(-1))%2; console.log(lastDigitSerial);
            var wireNum = 0;
            if ($scope.redWire)
            {
                wireNum+=8
            }
            if ($scope.blueWire)
            {
                wireNum+=4
            }
            if ($scope.starWire)
            {
                wireNum+=2
            }
            if ($scope.ledWire)
            {
                wireNum+=1
            }
           switch (wireNum) {
            case 0:
                $scope.advancedWireResult = "CUT";
                break;
            case 1:
                $scope.advancedWireResult = "DON'T CUT";
                break;
            case 2:
                $scope.advancedWireResult = "CUT";
                break;
            case 3:
                if($scope.batteries>=2)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
                break;
            case 4:
                if(lastDigitSerial==0)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
            case 5:
                if($scope.parallelPort)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
            case 6:
                $scope.advancedWireResult = "DON'T CUT";
                break;
            case 7:
                if($scope.parallelPort)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
            case 8:
                if(lastDigitSerial==0)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
                break;
            case 9:
                if($scope.batteries>=2)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
            case 10:
                $scope.advancedWireResult = "CUT";
                break;
            case 11:
                if($scope.batteries>=2)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
            case 12:
                if(lastDigitSerial==0)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
                break;
            case 13:
                if(lastDigitSerial==0)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
                break;
            case 14:
                if($scope.parallelPort)
                    $scope.advancedWireResult = "CUT";
                else 
                    $scope.advancedWireResult = "DON'T CUT";
                break;
            case 15:
                $scope.advancedWireResult = "DON'T CUT";
                break;
            }
            $scope.redWire = false;
            $scope.blueWire = false;
            $scope.starWire = false;
            $scope.ledWire = false;
        }


    });