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
    $scope.allSummoners="";
    $scope.summonersArray=[];
    $scope.selectedSummoners=[];
    $scope.champImgURL = "";
    $scope.champImgSprite = "";


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
    //GET Summoners
    $http.get('//ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/summoner.json').then(function(response){
    	$scope.allSummoners = response.data;
    	$scope.summonersArray = Object.keys($scope.allSummoners.data);
    	console.log($scope.summonersArray);
    	$scope.getSummoners();
    });
    //$scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(someHtmlVar);
    $scope.getSummoners = function(){
    	console.log("summoners got");
    	while(scope.selectedSummoners.length<2){
    		randNum = Math.floor(Math.random() * $scope.summonersArray.length);
	    	hId=$scope.allSummoners.data[$scope.summonersArray[randNum]];
	    	{
	    		var modeCheck=false;
	    		while(!modeCheck){
	    			for(var i = 0; i < $scope.summonersArray[randNum].mode.length;i++){
	    				if(scope.summonersArray[randNum].mode[i]=="CLASSIC"){
	    					modeCheck=true;
	    					$scope.selectedSummoners.push(scope.summonersArray[randNum]);
	    					console.log(scope.selectedSummoners);
	    				}
	    			}
	    		}

	    	}
    	}
    }
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
	    while($scope.items.length < 7)
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
			    		i=5000;
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
