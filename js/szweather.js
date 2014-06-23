$(document).ready(function() {
	getDataFromSZMB();
});

function getDataFromSZMB() {

	var stationList = ["G1122", "G3751", "G3553", "G3828", "G3527", "X3547"];

	var url = DATA_PATH + "szWeather/szEveryAreaMonitor.js?" + Math.random();

	$.ajax({
		type: "get",
		url: url,
		dataType: "text",
		success: function(data, textStatus, jqXHR) {
			var regExp = new RegExp(/({".*})(;)/);

			regExp.exec(data);

			var group = data.match(regExp);

			SZ121_EveryAreaMonitor = JSON.parse(group[1]);

			initNoteMonitor(stationList, false);

			if (data.indexOf(stationList[0]) == -1) {

				getHistoryDataFromSZMB();

			}

		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});

}

function getHistoryDataFromSZMB() {

	var stationList = ["G1122"];

	var currentDate = new Date();
	currentDate.setMinutes(currentDate.getMinutes() - 19);


	for (var minutes = 0; minutes < 6; minutes++) {

		var hisUrl = "http://www.szmb.gov.cn/data_center/?controller=shenzhenweather&action=hismonitor&json=1&date=";

		currentDate.setMinutes(currentDate.getMinutes() - 1);

		var dateTimeStr = currentDate.Format("yyyy-MM-dd hh:mm");

		hisUrl = hisUrl + encodeURIComponent(dateTimeStr);

		var response = $.ajax({
			type: "get",
			url: hisUrl,
			dataType: "text",
			async: false
		});

		var responseText = response.responseText;

		var regExp = new RegExp(/({".*})(;)/);

		regExp.exec(responseText);

		if (regExp.test(responseText)) {

			var group = responseText.match(regExp);

			SZ121_EveryAreaMonitor = JSON.parse(group[1]);

			initNoteMonitor(stationList, true);

			break;

		}

	}

}



function initNoteMonitor(stationList, beforeFlag) {


	for (var index = 0; index < stationList.length; index++) {
		var station = stationList[index];

		if (SZ121_EveryAreaMonitor[station] == undefined) {
			continue;
		}

		var windDirection = getWindDirection(SZ121_EveryAreaMonitor[station].WD).w;
		var windLevel = SZ121_EveryAreaMonitor[station].WS + "m/s " +
			getWindLevel(SZ121_EveryAreaMonitor[station].WS)
		if (/^\..*$/.test(windLevel)) windLevel = "0" + windLevel;


		var temperature = SZ121_EveryAreaMonitor[station].T + "℃";
		var areaName = SZ121_EveryAreaMonitor[station].OBTNAME;

		var areaWeatherDiv = $('<div></div>');
		areaWeatherDiv.addClass('areaWeather');

		var areaNameDiv = $('<div></div>');
		areaNameDiv.attr('id', 'areaName');
		areaNameDiv.html(areaName + SZ121_EveryAreaMonitor[station].DDATETIME.substr(10));
		areaNameDiv.appendTo(areaWeatherDiv);

		var temperatureDiv = $('<div></div>');
		temperatureDiv.attr('id', 'temperature');
		temperatureDiv.html(temperature);
		temperatureDiv.appendTo(areaWeatherDiv);


		var windDirectionDiv = $('<div></div>');
		windDirectionDiv.attr('id', 'windDirection');
		windDirectionDiv.html(windDirection);
		windDirectionDiv.appendTo(areaWeatherDiv);

		var windLevelDiv = $('<div></div>');
		windLevelDiv.attr('id', 'windLevel');
		windLevelDiv.html(windLevel);
		windLevelDiv.appendTo(areaWeatherDiv);

		if (beforeFlag == true) {
			areaWeatherDiv.prependTo($('body'));
		} else {
			areaWeatherDiv.appendTo($('body'));
		}


	}



}