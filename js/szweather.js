
$(document).ready(function() {
	getDataFromSZMB();
});

function getDataFromSZMB(){
	var url = DATA_PATH+"szWeather/szEveryAreaMonitor.js?"+Math.random();		
	
    $.ajax({
    	 contentType  :"application/x-www-form-urlencoded; charset=UTF-8",
         type: "get",
         url: url,
         dataType: "text",
         success: function(data,textStatus,jqXHR ){
         	regExp = new RegExp(/({".*})(;)/);

			regExp.exec(data);

         	var group = data.match(regExp);  

			SZ121_EveryAreaMonitor	= JSON.parse(group[1]);

         	initNoteMonitor();
         	
         },
         error: function(jqXHR,textStatus,errorThrown ){
             alert(errorThrown);
         }
     });	
	
}

function initNoteMonitor(){
	var stationList = ["G3751","G3553","G3828","G3527","X3547","G3761","G1166","G1121"];

	for (var index=0;index<stationList.length;index++){
		var station = stationList[index];

		if(SZ121_EveryAreaMonitor[station]==undefined){
			continue;
		}

		var windDirection = getWindDirection(SZ121_EveryAreaMonitor[station].WD).w;
		var windLevel = SZ121_EveryAreaMonitor[station].WS+"m/s "+
			getWindLevel(SZ121_EveryAreaMonitor[station].WS)
		if(/^\..*$/.test(windLevel))windLevel="0"+windLevel;


		var temperature = SZ121_EveryAreaMonitor[station].T + "℃";
		var areaName = SZ121_EveryAreaMonitor[station].OBTNAME;

	    var areaWeatherDiv=$('<div></div>');       
	    areaWeatherDiv.addClass('areaWeather');    
	    
	    var areaNameDiv=$('<div></div>');      
	    areaNameDiv.attr('id','areaName');           
	    areaNameDiv.html(areaName);    
	    areaNameDiv.appendTo(areaWeatherDiv);       

	    var temperatureDiv=$('<div></div>');       
	    temperatureDiv.attr('id','temperature');      
	    temperatureDiv.html(temperature);    
	    temperatureDiv.appendTo(areaWeatherDiv);       


	    var windDirectionDiv=$('<div></div>');       
	    windDirectionDiv.attr('id','windDirection');         
	    windDirectionDiv.html(windDirection);    
	    windDirectionDiv.appendTo(areaWeatherDiv);      

	    var windLevelDiv=$('<div></div>');        
	    windLevelDiv.attr('id','windLevel');           
	    windLevelDiv.html(windLevel);    
	    windLevelDiv.appendTo(areaWeatherDiv);       

	    areaWeatherDiv.appendTo($('body'));           
	}



}