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
    $scope.cbn = 0; //currentBuildNumber
    $scope.map="11";
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

    var stringLoad=false;

    var getImg = '//ddragon.leagueoflegends.com/cdn/7.8.1/img/';
    var getImgShort = '//ddragon.leagueoflegends.com/cdn/img/';
    var getChampSplash = '//ddragon.leagueoflegends.com/cdn/img/champion/splash/'
    //GET CHAMPIONS
    $http.get('//ddragon.leagueoflegends.com/cdn/7.8.1/data/en_US/champion.json').then(function(response){
    	$scope.allChampions = response.data;
    	$scope.championsArray = Object.keys($scope.allChampions.data);
    	console.log($scope.championsArray);
    	allDataChamps=true;
    	checkBuild();
    });
    //GET ITEMS
    $http.get('//ddragon.leagueoflegends.com/cdn/7.8.1/data/en_US/item.json').then(function(response){
    	$scope.allItems = response.data;
    	//console.log($scope.allItems);
    	allDataItems=true;
    	checkBuild();
    });
    //GET Summoners
    $http.get('//ddragon.leagueoflegends.com/cdn/7.8.1/data/en_US/summoner.json').then(function(response){
    	$scope.allSummoners = response.data;
    	//console.log($scope.allSummoners);
    	$scope.summonersArray = Object.keys($scope.allSummoners.data);
    	//console.log($scope.summonersArray);
    	allDataSum=true;
    	checkBuild();
    });
    $scope.getImgSrc=function(n){
    	return getImg+"champion/"+n+".png";
    }
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
				$scope.cb=getBuild(buildParam);
				//console.log($scope.cb);
	    		allDoneSum=true;
			    allDoneBuild=true;
			    allDoneChamps=true;
			    jQuery('.champImg').css('background-image','url('+$scope.cb.c.champBGImage+')');
			    stringLoad=true;
			    $scope.stringBuild();
			}else{
				$scope.cbn=0;
				$scope.getChamp();
				$scope.getSummoners();
				$scope.getItems();
				$scope.stringBuild();
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
	    		jQuery('.champImg').css('background-image','url('+ch.champBGImage+')');
	    		//console.log(hId);
	    	}
	    }
	    allDoneChamps=true;
    	$scope.stringBuild();
	}
	$scope.getItems = function(){
		console.log("-----Start Get Items-----");
		allDoneBuild=false;
		$scope.cb.i=[];
    	$scope.trink="";
    	console.log("-----Boots Loop-----");
		while($scope.cb.i.length<1)
	    {
	    	console.log("Looking for Boots");
	    	//console.log($scope.items.length);
	    	randNum = Math.floor(Math.random() * 1999)+2000;
	    	hId=$scope.allItems.data[randNum];
	    	//console.log(hId);
	    	hItem={};
	    	if(typeof hId != 'undefined'){
	    	 	for(var i=0; i<hId.tags.length;i++)
	    	 	{
	    	 		//console.log("LOOK HERE");
	    	 		//console.log(hId);
	    	 		if(hId.tags[i]=="Boots"&& hId.maps[$scope.map] && typeof hId.into == 'undefined')
	    	 		{
	    	 			console.log("*****Found Boots*****");
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
		console.log("-----Start Get Main Items-----");
	    while($scope.cb.i.length<6){
	    	console.log("Looking for Item");
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
	    		if($scope.cb.i.length < 6 && hId.maps[$scope.map] && typeof hId.requiredChampion == 'undefined' && typeof hId.specialRecipe == 'undefined' && typeof hId.into == 'undefined' && !hId.hideFromAll && hId.name!="" && hId.colloq!="" && !isTrink && !isBoots&&!isConsume&& hId.tags.length!=0 && typeof hId.inStore == 'undefined'){
		    		//console.log(hId);
		    		console.log("***** Item Number "+$scope.cb.i.length+" Found *****");
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
	    console.log("-----Start Find Trinket-----");
	    while($scope.cb.i.length < 7)
	    {
	    	console.log("-----Looking for Trinket-----");
	    	randNum = Math.floor(Math.random() * 2999)+1000;
	    	hId=$scope.allItems.data[randNum];
	    	var hItem={};
	    	if(typeof hId != 'undefined'){
	    	 	for(var i=0; i<hId.tags.length;i++)
	    	 	{
	    	 		if(hId.tags[i]=="Trinket"&& hId.maps[$scope.map] && typeof hId.requiredChampion == 'undefined' && typeof hId.specialRecipe == 'undefined' && typeof hId.into == 'undefined' && !hId.hideFromAll && hId.name!="" && hId.colloq!="" && hId.tags.length!=0 && typeof hId.inStore == 'undefined')
	    	 		{
	    	 			console.log("***** TRINK FOUND *****");
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
    	console.log("-----END LOOKING FOR ITEMS-----");
	}

	function getCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
	}

    $scope.stringBuild = function(){
    	if(allDoneBuild&&allDoneChamps&&allDoneSum){
    		var string="";
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
			$scope.buildString=window.location.hostname+document.location.pathname+"?b="+string;


			//resets previous build cookies
			var hd= new Date();
			hd.setMonth(hd.getMonth() + 1);
			ce=hd.toUTCString();

			pb=[];
			for(i=0;i<5;i++){
				pb.push(getCookie("pb"+i));
			}
			for(i=4;i>=0;i--){
				document.cookie = "pb"+i+"="+pb[i-1]+"; expires="+ce+"; path=/";
			}
			document.cookie = "pb0="+string+"; expires="+ce+"; path=/";

			//jQuery('.body').show();
			//jQuery('.loader').hide();

			$scope.setPrevBuild();
			window.history.pushState("", "", "/arl/" );
			allDoneSum=false;
		    allDoneBuild=false;
		    allDoneChamps=false;
    	}
    }

    $scope.setPrevBuild = function(){
    	$scope.pb=[];
		for(i=0;i<5;i++){
			var c=getCookie("pb"+i);
			$scope.pb.push(getBuild(c));
		}
		//console.log($scope.pb);
    }
    $scope.viewHistory = function(d){
    	//console.log("viewHistory");
    	if(d==0&&$scope.cbn!=4){
    		$scope.cbn+=1;
    	}else if(d==1&&$scope.cbn!=0){
    		$scope.cbn-=1;
    	}else{
    		$scope.cbn=0;
    	}
    	//console.log($scope.cbn);
    	//console.log($scope.cb);
    	hb=getBuild(pb[$scope.cbn]);
    	//console.log(hb);
    	$scope.cb=getBuild(pb[$scope.cbn]);
    	jQuery('.champImg').css('background-image','url('+$scope.cb.c.champBGImage+')');
    }
});
