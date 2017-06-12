
    app.controller("passwordControl", function($scope) {
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

        $scope.gaPasswordStart=true;
        $scope.passList = ['about','after','again','below','could','every','first',
        'found','great','house','large','learn','never','other','place','plant',
        'point','right','small','sound','spell','still','study','their','there',
        'these','things','think','three','water','where','which','world','would',
        'write']
        $('#filterChar1').keyup(function() {
            if($scope.gaPasswordStart){
                window.dataLayer.push({"event":"trackEvent","category":"Password","action":"Start"});
                window.dataLayer.push({"category":"","action":"","label":""});
                $scope.gaPasswordStart=false;
            }
            $scope.passes=$('#passUL li');
            var re1 = new RegExp ("("+$(this).val().split('').join('|')+").(.*).(.*).(.*).(.*)", "i");
            $scope.passes.show().filter(function(){ return !re1.test($(this).text());}).hide();
        }); 
        $('#filterChar2').keyup(function() {
            $scope.passes=$('#passUL li');
            var re2 = new RegExp ("("+$('#filterChar1').val().split('').join("|")+")("+$(this).val().split("").join("|")+").(.*).(.*).(.*)", "i"); console.log(re2);
            $scope.passes.show().filter(function(){ return !re2.test($(this).text());}).hide();

        }); 
        $('#filterChar3').keyup(function() {
            $scope.passes=$('#passUL li');
            var re3 = new RegExp ("("+$('#filterChar1').val().split("").join("|")+")("+$('#filterChar2').val().split("").join("|")+")("+$(this).val().split("").join("|")+").(.*).(.*)", "i");
            $scope.passes.show().filter(function(){ return !re3.test($(this).text());}).hide();
        }); 
        $('#filterChar4').keyup(function() {
            $scope.passes=$('#passUL li');
            var re4 = new RegExp ("("+$('#filterChar1').val().split("").join("|")+")("+$('#filterChar2').val().split("").join("|")+")("+$('#filterChar3').val().split("").join("|")+")("+$(this).val().split("").join("|")+").(.*)", "i");
            $scope.passes.show().filter(function(){ return !re4.test($(this).text());}).hide();
        }); 
        $('#filterChar5').keyup(function() {
            $scope.passes=$('#passUL li');
            var re5 = new RegExp ("("+$('#filterChar1').val().split("").join("|")+")("+$('#filterChar2').val().split("").join("|")+")("+$('#filterChar3').val().split("").join("|")+")("+$('#filterChar4').val().split("").join("|")+")("+$(this).val().split("").join("|")+")", "i");
            $scope.passes.show().filter(function(){ return !re5.test($(this).text());}).hide();
        }); 
        $scope.resetPass = function (){
            $scope.serial1 = "";
            $scope.serial2 = "";
            $scope.serial3 = "";
            $scope.serial4 = "";
            $scope.serial5 = "";
            $scope.passes=$('#passUL li').show();
            window.dataLayer.push({"event":"trackEvent","category":"Password","action":"Reset"});
            window.dataLayer.push({"category":"","action":"","label":""});
            $scope.gaPasswordStart=true;
        }
        function fireEvents ()
        {   var e = jQuery.Event("keyup");
            e.which = 13;
            e.keyCode = 13;
            if($("#filterChar1")!="")
            {
                if($("#filterChar2")!="")
                {
                    if($("#filterChar3")!="")
                    {
                        if($("#filterChar4")!="")
                        {
                             if($("#filterChar5")!="")
                            {
                                $("#filterChar5").trigger(e);
                            }
                            else
                            {
                                $("#filterChar").trigger(e);
                            }
                        }
                        else
                        {
                            $("#filterChar3").trigger(e);
                        }
                    }
                    else
                    {
                        $("#filterChar2").trigger(e);
                    }
                }
                else
                {
                    $("#filterChar1").trigger(e);
                }
            }
        }
    });