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
    $scope.buildString="";

    var allDoneSum=false;
    var allDoneBuild=false;
    var allDoneChamps=false;
    var allDataSum=false;
    var allDataItems=false;
    var allDataChamps=false;

    var getImg = '//ddragon.leagueoflegends.com/cdn/6.24.1/img/';
    var getImgShort = '//ddragon.leagueoflegends.com/cdn/img/';
    var getChampSplash = '//ddragon.leagueoflegends.com/cdn/img/champion/splash/'


    //GET CHAMPIONS
    $http.get('//ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json').then(function(response){
    	$scope.allChampions = response.data;
    	$scope.championsArray = Object.keys($scope.allChampions.data);
    	//console.log($scope.championsArray);
    	allDataChamps=true;
    	checkBuild();
    });

    //GET ITEMS
    $http.get('//ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/item.json').then(function(response){
    	$scope.allItems = response.data;
    	//console.log($scope.allItems);
    	allDataItems=true;
    	checkBuild();
    });
    //GET Summoners
    $http.get('//ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/summoner.json').then(function(response){
    	$scope.allSummoners = response.data;
    	//console.log($scope.allSummoners);
    	$scope.summonersArray = Object.keys($scope.allSummoners.data);
    	//console.log($scope.summonersArray);
    	allDataSum=true;
    	checkBuild();
    });


    function getParameterByName(name, url) {
	    if (!url) {
	      url = window.location.href;
	    }
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function checkBuild(){
		if(allDataSum&&allDataItems&&allDataChamps){
			var buildParam = getParameterByName("b");
			console.log(getParameterByName("b"));
			if(buildParam!=null){
				buildParamArray=buildParam.split("l");
				console.log(buildParamArray);
				console.log($scope.allChampions.data[$scope.championsArray[buildParamArray[0]]]);
				
			}//else{
				$scope.getChamp();
				$scope.getSummoners();
				$scope.getItems();
			//}
		}
	}









    $scope.getSummoners = function(){
    	allDoneSum=false;
    	$scope.selectedSummoners=[];
    	var modeCheck=false;
    	while($scope.selectedSummoners.length<2){
    		randNum = Math.floor(Math.random() * $scope.summonersArray.length);
	    	hId=$scope.allSummoners.data[$scope.summonersArray[randNum]];
    		modeCheck=false;
    		count=0;
    		//console.log(hId);
    		while(!modeCheck&&count<50){
    			for(var i = 0; i < hId.modes.length;i++){
    				if(hId.modes[i]=="CLASSIC"){
    					modeCheck=true;
    					var holdSum={"name":hId.name,"img":getImg+"spell/"+hId.image.full,"id":randNum}
    					$scope.selectedSummoners.push(holdSum);
    					//console.log($scope.selectedSummoners);
    				}
    			}
    			count++;
    		}
    	}
    	allDoneSum=true;
    	$scope.stringBuild();
    }
    $scope.getChamp = function(){
    	//console.log("GET CHAMP");
    	allDoneChamps=false;
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
	    		//console.log(hId);
	    	}
	    }
	    allDoneChamps=true;
    	$scope.stringBuild();
	}
	$scope.getItems = function(){
		allDoneBuild=false;
		$scope.items=[];
    	$scope.trink="";
		while($scope.items.length<1)
	    {
	    	//console.log($scope.items.length);
	    	randNum = Math.floor(Math.random() * 1999)+2000;
	    	hId=$scope.allItems.data[randNum];
	    	var hItem={};
	    	if(typeof hId != 'undefined'){
	    	 	for(var i=0; i<hId.tags.length;i++)
	    	 	{
	    	 		if(hId.tags[i]=="Boots"&& hId.maps[11] && hId.into.length<7)
	    	 		{
	    	 			//console.log(hId);
			    		hItem.id=randNum;
			    		hItem.name=hId;
			    		hItem.icon=getImg+'item/'+hId.image.full;
			    		hItem.desc=hId.description;
			    		$scope.items.push(hItem);
			    		//console.log($scope.items);
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
		    		//console.log(hId);
		    		hItem.id=randNum;
		    		hItem.name=hId;
		    		hItem.icon=getImg+'item/'+hId.image.full;
		    		hItem.desc=hId.description;
		    		$scope.items.push(hItem);
		    		//console.log($scope.items);
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
	    	 			//console.log(hId);
			    		hItem.id=randNum;
			    		hItem.name=hId;
			    		hItem.icon=getImg+'item/'+hId.image.full;
			    		hItem.desc=hId.description;
			    		$scope.items.push(hItem);
			    		//console.log($scope.items);
			    		i=5000;
	    	 		}
	    	 	}
			}
		}
	    //console.log($scope.allItems.data);
	    allDoneBuild=true;
    	$scope.stringBuild();
	}

    $scope.stringBuild = function(){
    	if(allDoneBuild&&allDoneChamps&&allDoneSum){
    		var string="";
    		string+=$scope.champId+"l";
    		for(i=0;i<$scope.items.length;i++)
    		{
    			string+=$scope.items[i].id.toString(16)+"l";
    		}
    		for(i=0;i<2;i++)
    		{
    			string+=$scope.selectedSummoners[i].id+"l";
    		}
    		var d = new Date();
			string+= d.getTime().toString(16);
			$scope.buildString=string;
    	}
    }
});
