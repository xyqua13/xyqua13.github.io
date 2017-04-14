var app = angular.module("ARL", []); 
app.controller("ctrlIt", function($scope,$http) {
    $scope.region = 'NA'
    $scope.champId = -1;
    $scope.champName ="";
    $scope.champTitle ="";
    $scope.allChampions ="";
    $scope.championsArray=[];
    $scope.allItems="";
    $scope.items=[];
    $scope.trink="";
    $scope.boots="";

    $scope.champImgURL = "";
    $scope.champImgSprite = "";
    //var api_key = "86781244-33e9-4829-ba9a-7b968be0cf6d";
    var getImg = '//ddragon.leagueoflegends.com/cdn/6.24.1/img/';
    var getImgShort = '//ddragon.leagueoflegends.com/cdn/img/';
    var getChampSplash = '//ddragon.leagueoflegends.com/cdn/img/champion/splash/'


    //GET CHAMPIONS
    $http.get('//ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').then(function(response){
    	$scope.allChampions = response.data;
    	$scope.championsArray = Object.keys($scope.allChampions.data);
    	console.log($scope.championsArray);
    	$scope.getChamp();
    });

    //GET ITEMS
    $http.get('//ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/item.json').then(function(response){
    	$scope.allItems = response.data;
    	console.log($scope.allItems);
    	$scope.getItems();
    });

    //$scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(someHtmlVar);

    $scope.getChamp = function(){
    	console.log("GET CHAMP");
    	$scope.champId=-1;
	    while($scope.champId==-1){
	    	randNum = Math.floor(Math.random() * $scope.championsArray.length);
	    	hId=$scope.allChampions.data[$scope.championsArray[randNum]];
	    	if(typeof hId != 'undefined'){
	    		$scope.champName=hId.name;
	    		$scope.champId=hId.key;
	    		$scope.champImgIcon=getImg+'champion/'+hId.image.full;
	    		$scope.champImgSprite=getImgShort+'champion/loading/'+hId.id+'_0.jpg';
	    		$scope.champBGImage = getChampSplash +hId.id+'_0.jpg';
	    		$scope.champTitle = hId.title;
	    		//$scope.document.body.style.backgroundImage="url($scope.champBGImage)";
	    		jQuery('.champImg').css('background-image','url('+$scope.champBGImage+')');
	    		console.log(hId);
	    	}
	    }
	}
	$scope.getItems = function(){
		$scope.items=[];
    	$scope.trink="";
		while($scope.items.length<1)
	    {
	    	console.log($scope.items.length);
	    	randNum = Math.floor(Math.random() * 1999)+2000;
	    	hId=$scope.allItems.data[randNum];
	    	var hItem={};
	    	if(typeof hId != 'undefined'){
	    	 	for(var i=0; i<hId.tags.length;i++)
	    	 	{
	    	 		if(hId.tags[i]=="Boots"&& hId.maps[11] && hId.into.length<7)
	    	 		{
	    	 			console.log(hId);
			    		hItem.id=randNum;
			    		hItem.name=hId;
			    		hItem.icon=getImg+'item/'+hId.image.full;
			    		hItem.desc=hId.description;
			    		$scope.items.push(hItem);
			    		console.log($scope.items);
			    		delete $scope.allItems.data[randNum];
	    	 		}
	    	 	}
			}
		}
	    while($scope.items.length<6){
	    	randNum = Math.floor(Math.random() * 999)+3000;
	    	hId=$scope.allItems.data[randNum];
	    	var hItem={};
	    	if(typeof hId != 'undefined'){
	    		var isTrink = false;
	    		var isBoots = false;
	    		var isConsume = false;
	    	 	for(var i=0; i<hId.tags.length;i++)
	    	 	{
	    	 		if(hId.tags[i]=="Trinket")
	    	 		{
	    	 			isTrink=true;
	    	 		}
	    	 		if(hId.tags[i]=="Boots")
	    	 		{
	    	 			isTrinkBoots=true;
	    	 		}
	    	 		if(hId.tags[i]=="Consumable")
	    	 		{
	    	 			//isConsume=true;
	    	 		}
	    	 	}
	    		if($scope.items.length < 6 && hId.maps[11] && typeof hId.requiredChampion == 'undefined' && typeof hId.specialRecipe == 'undefined' && hId.into.length==0 && !hId.hideFromAll && hId.name!="" && hId.colloq!="" && !isTrink && !isBoots&&!isConsume&& hId.tags.length!=0 && typeof hId.inStore == 'undefined'){
		    		console.log(hId);
		    		hItem.id=randNum;
		    		hItem.name=hId;
		    		hItem.icon=getImg+'item/'+hId.image.full;
		    		hItem.desc=hId.description;
		    		$scope.items.push(hItem);
		    		console.log($scope.items);
		    	}
	    	}
	    }
	    //FIND TRINKET
	    while($scope.trink=="")
	    {
	    	randNum = Math.floor(Math.random() * 2999)+1000;
	    	hId=$scope.allItems.data[randNum];
	    	var hItem={};
	    	if(typeof hId != 'undefined'){
	    	 	for(var i=0; i<hId.tags.length;i++)
	    	 	{
	    	 		if(hId.tags[i]=="Trinket"&& hId.maps[11] && typeof hId.requiredChampion == 'undefined' && typeof hId.specialRecipe == 'undefined' && hId.into.length==0 && !hId.hideFromAll && hId.name!="" && hId.colloq!="" && hId.tags.length!=0 && typeof hId.inStore == 'undefined')
	    	 		{
	    	 			console.log(hId);
			    		hItem.id=randNum;
			    		hItem.name=hId;
			    		hItem.icon=getImg+'item/'+hId.image.full;
			    		hItem.desc=hId.description;
			    		$scope.items.push(hItem);
			    		console.log($scope.items);
	    	 			console.log("TRINKET FOUND");
	    	 			$scope.trink=getImg+'item/'+hId.image.full;
			    		console.log("TRINK");
			    		console.log($scope.trink);
	    	 		}
	    	 	}
			}
		}
	    console.log($scope.allItems.data);
	}

    $scope.randChamp = function(){

    	return "THIS";
    }
});
