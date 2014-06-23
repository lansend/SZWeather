
$(document).ready(function() {
	getDataFromSZMB();
});

function getDataFromSZMB(){
	
	createScript(DATA_PATH+"szWeather/szEveryAreaMonitor.js?"+Math.random(),
		receiveDataFromSZMB);

}

function receiveDataFromSZMB(){

	var stationList = ["G3751", "G3553", "G3828", "G3527", "X3547"];

	initNoteMonitor(stationList,false);

	if(SZ121_EveryAreaMonitor["G1122"]==undefined){
		minutes = 6;
		currentDate = new Date();
		currentDate.setMinutes(currentDate.getMinutes() - 19);		
		getHistoryDataFromSZMB();
	}

}

function getHistoryDataFromSZMB(){

	var hisUrl = "http://www.szmb.gov.cn/data_center/?controller=shenzhenweather&action=hismonitor&json=1&date=";

	currentDate.setMinutes(currentDate.getMinutes() - 1);

	dateTimeStr = currentDate.Format("yyyy-MM-dd hh:mm");

	hisUrl = hisUrl + encodeURIComponent(dateTimeStr);


	createScript(hisUrl,
		receiveHistoryDataFromSZMB);



}

function receiveHistoryDataFromSZMB(){

	var stationList = ["G1122"];


	try{eval("var curdata=SZ121_EveryAreaMonitor"+
		dateTimeStr.replace(/(-|:| )/g,''));}catch(e){}


	SZ121_EveryAreaMonitor = curdata;	

	if(SZ121_EveryAreaMonitor[stationList[0]]!=undefined){

		initNoteMonitor(stationList,true);

	}else if(minutes>0){

		minutes=minutes-1;


		getHistoryDataFromSZMB();

	}

}




function initNoteMonitor(stationList,beforeFlag){

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

		if (beforeFlag == true) {
			areaWeatherDiv.prependTo($('body'));
		} else {
			areaWeatherDiv.appendTo($('body'));
		}       
	}



}