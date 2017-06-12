
    app.controller("sequenceControl", function($scope) {
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
        
        $scope.seqResult = "---"
        $scope.redSeq = ['C','B','A','AC','B','AC','ABC','AB','B']
        $scope.blueSeq = ['B','AC','B','A','B','BC','C','AC','A']
        $scope.blackSeq = ['ABC','AC','B','AC','B','BC','AB','C','C']
        $scope.seqCount = 0
        $scope.redSeqCount = 0
        $scope.blueSeqCount = 0
        $scope.blackSeqCount = 0


        $scope.gaSequenceWireStart=true;
        $scope.addWireSeq = function (color, letter) {
           if($scope.gaSequenceWireStart){
                window.dataLayer.push({"event":"trackEvent","category":"Sequence Wires","action":"Start"});
                window.dataLayer.push("category":"","action":"":"label","");
                $scope.gaSequenceWireStart=false;
           }
            var check = false

            if(color == 'Red' && $scope.redSeqCount < 9)
            {
                
                if($scope.redSeq[$scope.redSeqCount].length > 1)
                {
                    check = $scope.redSeq[$scope.redSeqCount].indexOf(letter)

                    if(check == true)
                        $scope.seqResult = "CUT: " + color + " " + letter 
                    else
                        $scope.seqResult = "DON'T CUT: " + color + " " + letter 
                }
                else
                {
                    if(letter == $scope.redSeq[$scope.redSeqCount])
                        $scope.seqResult = "CUT: " + color + " " + letter   
                    else
                        $scope.seqResult = "DON'T CUT: " + color + " " + letter 
                }
                $scope.redSeqCount++
            }

            if(color == 'Blue' && $scope.blueSeqCount < 9)
            {
                if($scope.blueSeq[$scope.blueSeqCount].length > 1)
                {
                    check = $scope.blueSeq[$scope.blueSeqCount].indexOf(letter)

                    if(check == true)
                        $scope.seqResult = "CUT: " + color + " " + letter
                    else
                        $scope.seqResult = "DON'T CUT: " + color + " " + letter 
                }
                else
                {
                    if(letter == $scope.blueSeq[$scope.blueSeqCount])
                        $scope.seqResult = "CUT: " + color + " " + letter 
                    else
                        $scope.seqResult = "DON'T CUT: " + color + " " + letter 
                }
                $scope.blueSeqCount++
            }

            if(color == 'Black' && $scope.blackSeqCount < 9)
            {
                
                if($scope.blackSeq[$scope.blackSeqCount].length > 1)
                {
                    check = $scope.blackSeq[$scope.blackSeqCount].includes(letter)

                    if(check == true)
                        $scope.seqResult = "CUT: " + color + " " + letter 
                    else
                        $scope.seqResult = "DON'T CUT: " + color + " " + letter 
                }
                else
                {
                    if(letter == $scope.blackSeq[$scope.blackSeqCount])
                        $scope.seqResult = "CUT: " + color + " " + letter 
                    else
                        $scope.seqResult = "DON'T CUT: " + color + " " + letter 
                }
                $scope.blackSeqCount++
            }

            $scope.seqCount++
        }

        $scope.resetWireSeq = function(){
            $scope.redSeqCount = 0
            $scope.blueSeqCount = 0
            $scope.blackSeqCount = 0
            $scope.seqResult = "RESET"
            $scope.gaSequenceWireStart=true;
            window.dataLayer.push({"event":"trackEvent","category":"Sequence Wires","action":"Reset"});
            window.dataLayer.push("category":"","action":"":"label","");
        }
        
});