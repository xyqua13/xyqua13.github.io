var app = angular.module("ARL", []); 
app.controller("ctrlIt", function($scope,$http) {
    $scope.region = 'NA'
    $scope.champId = -1;
    $scope.champName ="";
    $scope.champTitle ="";
    $scope.allChampions ="";
    $scope.championsArray=[];
    $scope.champArrayId=-1;
    $scope.allItems="";
    $scope.items=[];
    var hItem={};
    $scope.trink="";
    $scope.boots="";
    $scope.allSummoners="";
    $scope.summonersArray=[];
    $scope.selectedSummoners=[];
    $scope.champImgURL = "";
    $scope.champImgSprite = "";
    $scope.buildString="";


    $scope.cb = {c:{},i:[],s:[]};
    //cb=current build
    //c=champion
    //i=items
    //s=summoners
    //dataContainer
    //{champ:{},items:[{id:123,name:boots,ect},{}],sum:[]}


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
			//console.log(getParameterByName("b"));
			if(buildParam!=null){
				cb=getBuild(buildParam);
	    		allDoneSum=true;
			    allDoneBuild=true;
			    allDoneChamps=true;
			    $scope.stringBuild();
			}else{
				$scope.getChamp();
				$scope.getSummoners();
				$scope.getItems();
			}
		}
	}

	function getBuild(param){
		var h={c:{},i:[],s:[]};
		var ch={};
		hItem={};
		buildParamArray=param.split("l");
		//console.log(buildParamArray);
		//console.log($scope.allChampions.data[$scope.championsArray[buildParamArray[0]]]);
		hId=$scope.allChampions.data[$scope.championsArray[buildParamArray[0]]];
		ch.champName=hId.name;
		ch.champId=hId.key;
		ch.champArrayId=buildParamArray[0];
		ch.champImgIcon=getImg+'champion/'+hId.image.full;
		ch.champImgSprite=getImgShort+'champion/loading/'+hId.id+'_0.jpg';
		ch.champBGImage = getChampSplash +hId.id+'_0.jpg';
		ch.champTitle = hId.title;
		h.c=ch;
		//$scope.document.body.style.backgroundImage="url($scope.champBGImage)";
		jQuery('.champImg').css('background-image','url('+$scope.champBGImage+')');
		window.history.pushState("", "", "/arl/" );
		for(i=1;i<8;i++){
			hItem={};
			hItem.id=parseInt(buildParamArray[i],16);
			hId=$scope.allItems.data[hItem.id];
    		hItem.name=hId.name;
    		hItem.icon=getImg+'item/'+hId.image.full;
    		hItem.desc=hId.description;
    		h.i.push(hItem);
		}
		for(var i = 8; i < 10;i++){
			var id=buildParamArray[i];
			hId=$scope.allSummoners.data[$scope.summonersArray[id]];
			var holdSum={"name":hId.name,"img":getImg+"spell/"+hId.image.full,"id":id};
			h.s.push(holdSum);
			//console.log($scope.selectedSummoners);
		}
		return h;
	}







    $scope.getSummoners = function(){
    	allDoneSum=false;
    	$scope.cb.s=[];
    	var modeCheck=false;
    	while($scope.cb.s.length<2){
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
    					$scope.cb.s.push(holdSum);
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
    	$scope.cb.c.champId=-1;
	    while($scope.cb.c.champId==-1){
	    	randNum = Math.floor(Math.random() * $scope.championsArray.length);
	    	hId=$scope.allChampions.data[$scope.championsArray[randNum]];
	    	if(typeof hId != 'undefined'){
	    		var ch={};
	    		ch.champName=hId.name;
	    		ch.champId=hId.key;
	    		ch.champArrayId=randNum;
	    		ch.champImgIcon=getImg+'champion/'+hId.image.full;
	    		ch.champImgSprite=getImgShort+'champion/loading/'+hId.id+'_0.jpg';
	    		ch.champBGImage = getChampSplash +hId.id+'_0.jpg';
	    		ch.champTitle = hId.title;
	    		$scope.cb.c=ch;
	    		//$scope.document.body.style.backgroundImage="url($scope.champBGImage)";
	    		jQuery('.champImg').css('background-image','url('+$scope.cb.c.champBGImage+')');
	    		//console.log(hId);
	    	}
	    }
	    allDoneChamps=true;
    	$scope.stringBuild();
	}
	$scope.getItems = function(){
		allDoneBuild=false;
		$scope.cb.i.items=[];
    	$scope.trink="";
		while($scope.cb.i.length<1)
	    {
	    	//console.log($scope.items.length);
	    	randNum = Math.floor(Math.random() * 1999)+2000;
	    	hId=$scope.allItems.data[randNum];
	    	hItem={};
	    	if(typeof hId != 'undefined'){
	    	 	for(var i=0; i<hId.tags.length;i++)
	    	 	{
	    	 		if(hId.tags[i]=="Boots"&& hId.maps[11] && hId.into.length<7)
	    	 		{
	    	 			//console.log(hId);
			    		hItem.id=randNum;
			    		hItem.name=hId.name;
			    		hItem.icon=getImg+'item/'+hId.image.full;
			    		hItem.desc=hId.description;
			    		$scope.cb.i.push(hItem);
			    		//console.log($scope.items);
	    	 		}
	    	 	}
			}
		}
	    while($scope.cb.i.length<6){
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
	    		if($scope.cb.i.length < 6 && hId.maps[11] && typeof hId.requiredChampion == 'undefined' && typeof hId.specialRecipe == 'undefined' && hId.into.length==0 && !hId.hideFromAll && hId.name!="" && hId.colloq!="" && !isTrink && !isBoots&&!isConsume&& hId.tags.length!=0 && typeof hId.inStore == 'undefined'){
		    		//console.log(hId);
		    		hItem.id=randNum;
		    		hItem.name=hId;
		    		hItem.icon=getImg+'item/'+hId.image.full;
		    		hItem.desc=hId.description;
		    		$scope.cb.i.push(hItem);
		    		//console.log($scope.items);
		    	}
	    	}
	    }
	    //FIND TRINKET
	    while($scope.cb.i.length < 7)
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
			    		$scope.cb.i.push(hItem);
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
    		var string=window.location.hostname+document.location.pathname+"?b=";
    		string+=$scope.cb.c.champArrayId+"l";
    		for(i=0;i<$scope.cb.i.length;i++)
    		{
    			string+=$scope.cb.i[i].id.toString(16)+"l";
    		}
    		for(i=0;i<2;i++)
    		{
    			string+=$scope.cb.s[i].id+"l";
    		}
    		var d = new Date();
			string+= d.getTime().toString(16);
			$scope.buildString=string;
			//jQuery('.body').show();
			//jQuery('.loader').hide();
    	}
    }
});
