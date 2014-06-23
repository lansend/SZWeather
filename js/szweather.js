
$(document).ready(function() {
	getDataFromSZMB();
});

function getDataFromSZMB(){
	
		createScript(DATA_PATH+"szWeather/szEveryAreaMonitor.js?"+Math.random(),initNoteMonitor);
	
}

function initNoteMonitor(){
	var stationList = ["G3751","G3553","G3828","G3527","X3547"];

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