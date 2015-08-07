/* Application for 345 Assignment: Rory Mearns (ID.3928873) */

/* ------ Global Variables ------ */
var appOn = true,
sailAlpha = 1.34,
skill = ["beginner", "experienced"],	// Skill options available to users
days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
currentDay = "monday", 
currentScreen = false,
warningMsg = "Storm Warning",
warningToday = true,
firstBoot = true;

/* ------ User Settings ------ */
var user = {
	riderWeight: 85,
	riderDays: ["wednesday", "friday", "saturday", "sunday"],
	riderSkill: "experienced",
	riderLocal: "St Clair"
}

/* ------ Weather Data ------ */
// Raw weather will be processed into the following format:
var weather = {
	day0: {					// Day0 = Today
		windLower: 26,
		windUpper: 34,
		windDir: "SE",
		temp: 12,
		sailSize: 4.2,
		outlook: "Rain, high seas, gale",
		icon: "weather_rain_33x33.svg",
		dName: "Monday"
	},
	day1: {	
		windLower: 28,
		windUpper: 36,
		windDir: "S",
		temp: 9,
		sailSize: 4.2,
		outlook: "Rain, high seas, gale",
		icon: "weather_rain_33x33.svg",
		dName: "Tuesday"
	},
	day2: {
		windLower: 18,
		windUpper: 22,
		windDir: "E",
		temp: 14,
		sailSize: 4.2,
		outlook: "Strong wind, overcast",
		icon: "weather_wind_cloud_33x33.svg",
		dName: "Wednesday"
	},
	day3: {	
		windLower: 8,
		windUpper: 14,
		windDir: "NE",
		temp: 17,
		sailSize: 4.2,
		outlook: "Moderate winds, sunny",
		icon: "weather_sun_33x33.svg",
		dName: "Thursday"
	}
}

/* ------ Process Raw Weather Into Local Stored Data ------ */
function constructWeather () {
	/* 
	Many more funcitons & setters are to go in here to take 
	the raw weather data and convert it into the locally 
	stored weather data for easy access. 
	*/

	for (var i=0; i<=3; i++) {
		// Set the day names
		weather['day'+i]['dName'] = getTodayPlusX(i);
		// Set the sail sizes (note: wind ranges NEED to be set prior!)
		weather['day'+i]['sailSize'] = sailSizeSetter(weather['day'+i]['windLower'], weather['day'+i]['windUpper']);
	}
};

/* ------ Build Alert Screen ------ */
function buildAlertScreen (day) {
	// A day array = 	[0]sailSize, [1]day, [2]windLower, [3]windUpper, [4]temp, 
	// 					[5]image, [6]forecastDesc, [7]locations, [8]wind direction
	// Paint the background
	clearScreen();
	setBackgroundColor("#000");
	// Draw the sail recommendation
	drawCircle(235, 75, 52, "white");
	var size, shift;
	(day[0] < 10) ? (size = "60px", shift = 95) : (size = "50px", shift = 91);
	drawText(235, shift, ("bold "+size+" helvetica"), "black", day[0], "center");
	// Draw the current weather icon
	drawImage(55, 35, 90, 90, "../prototype_javascript/app_images/"+day[5]);
	// Write the day
	drawText(170, 173, "bold 42px helvetica", "#939597", day[1], "center");
	// Write the location
	drawText(170, 210, "100 30px helvetica ", "#939597", day[7], "center");
	// Draw the seperator line
	drawLine(20, 225, 320, 225, "white", 1);
	// Write the wind speed
	drawText(30, 268, "100 30px helvetica ", "#00ADEF", ("Wind: "+day[2]+"-"+day[3]+" kn"+", "+day[8]));
	// write the temperature 
	drawText(30, 308, "100 30px helvetica ", "#00ADEF", ("Temp: "+day[4]+"°C"));
};

/* ------ Build Home Screen ------ */
function buildHomeScreen (day) {
	// A day array = 	[0]sailSize, [1]day, [2]windLower, [3]windUpper, [4]temp, 
	// 					[5]image, [6]forecastDesc, [7]locations, [8]wind direction
	// Paint the background
	clearScreen();
	setBackgroundColor("#000");
	// Draw the sail recommendation
	drawCircle(170, 81, 52, "white");
	var size, shift;
	(day[0] < 10) ? (size = "60px", shift = 101) : (size = "50px", shift = 98);
	drawText(170, shift, "bold "+size+" helvetica", "black", day[0], "center");
	// Draw the current weather icon
	drawImage(28, 53, 73, 73, "../prototype_javascript/app_images/"+day[5]);
	// Write the day
	var dayShort = shortenDay(day[1]);
	drawText(230, 97, "400 38px helvetica", "#939597", dayShort);
	// Write forecast:
	drawText(170, 175, "100 30px helvetica ", "#BBBDC0", day[6], "center");
	// Write the wind & temp:
	drawText(170, 212, "100 30px helvetica ", "#00ADEF", (+day[2]+"-"+day[3]+" kn, "+day[8]+", "+day[4]+"°C"), "center");
	// Write any warnings:
	if (warningToday) {
		drawText(170, 263, "100 30px helvetica ", "#ED1C24", warningMsg, "center");
		drawImage(25, 241, 27, 25, "../prototype_javascript/app_images/warning_27x25.svg");
		drawImage(285, 241, 27, 25, "../prototype_javascript/app_images/warning_27x25.svg");
	}
	// Write the location
	drawText(170, 315, "100 30px helvetica ", "#939597", day[7], "center");
	// Draw the calender & settings buttons
	drawImage(25, 280, 49, 44, "../prototype_javascript/app_images/cal_49x44.svg");
	drawImage(270, 280, 44, 44, "../prototype_javascript/app_images/settings_44x44.svg");
};

/* ------ Build Forecast Screen ------ */
function buildForecastScreen (day0, day1, day2, day3) {
	// A day array = 	[0]sailSize, [1]day, [2]windLower, [3]windUpper, [4]temp, 
	// 					[5]image, [6]forecastDesc, [7]locations, [8]wind direction
	// Paint the background
	clearScreen();
	setBackgroundColor("#000");
	// Draw the dividers & arrows (Baselines: 105, 270, 235, 300) 
	drawLine(20, 40, 320, 40, "white", 1);
	drawLine(20, 105, 320, 105, "white", 1);
	drawLine(20, 170, 320, 170, "white", 1);
	drawLine(20, 235, 320, 235, "white", 1);
	drawLine(20, 300, 320, 300, "white", 1);
	drawImage(155, 10, 30, 16, "../prototype_javascript/app_images/up_30x16.svg");
	drawImage(155, 314, 30, 16, "../prototype_javascript/app_images/down_30x16.svg");

	// All thats needed to build each line & then building all four forecasts:
	function drawDay (day, offset) {
		drawText(170, 92+offset, "bold 55px helvetica", "white", day[0], "center");
		drawText(62, 81+offset, "100 22px helvetica", "white", shortenDay(day[1]));
		drawText(320, 65+offset, "100 22px helvetica", "#939597", (day[2]+"-"+day[2]+" kn"), "right");
		drawText(320, 94+offset, "100 22px helvetica", "#00ADEF", (day[8]+", "+day[4]+"°C"), "right");
		drawImage(20, 56+offset, 33, 33, "../prototype_javascript/app_images/"+day[5]);
	}
	drawDay(day0, 0);
	drawDay(day1, 65);
	drawDay(day2, 130);
	drawDay(day3, 195);
};

/* ------ Build Settings Screen ------ */
function buildSettingsScreen () {
	// Paint the background
	clearScreen();
	setBackgroundColor("#000");
	drawText(170, 40, "100 30px helvetica ", "#FFFFFF", "Settings[FIXED]", "center");
	drawText(15, 80, "100 20px helvetica ", "#BBBDC0", ("Rider Location: "+user.riderLocal));
	drawText(15, 105, "100 20px helvetica ", "#BBBDC0", ("Rider Skill: "+user.riderSkill));
	drawText(15, 130, "100 20px helvetica ", "#BBBDC0", ("Rider Weight: "+user.riderWeight));
};

/* ------ Check For Alerts ------ */
function alertChecker () {
	/*
	The alert checker function will go through all the
	weather data (either Raw or Local, undecided yet) and
	check for conditions that are favorable to the users
	preferences. If a favorable forecast is found it 
	will alert the user after a short wait. Maybe include
	some sort of audio alert: **BEEP**

	The alert checker will deliver the FIRST and only the 
	first favorable forecast alert. This makes sense from
	a users point of view:
		a) 	It would seem obnoxious to alert the user 4 times
			if there are 4 days in a row of favorable weather.
		b)	If the user is allerted to favorable weather (on 
			wednesday for example) and they can't make the most
			of the weather on that day, it is likely that they
			would check the wether for subsequent days at that
			time.
	*/
};

/* ------ Some Helper Functions ------ */
// Shorten day name:
function shortenDay (day) {
	switch (day.toLowerCase()){
		case "monday": 
		return "Mon";
		break;
		case "tuesday": 
		return "Tues";
		break;
		case "wednesday": 
		return "Wed";
		break;
		case "thursday": 
		return "Thurs";
		break;
		case "friday": 
		return "Fri";
		break;
		case "saturday": 
		return "Sat";
		break;
		case "sunday": 
		return "Sun";
		break;	
	}
};

// Calculate the sail size given a wind range
function sailSizeSetter (lower, upper) {
	// Sail size is: (Rider Weight X 1.34) / Windspeed in Knots
	return ((user.riderWeight*sailAlpha)/((lower+upper)/2)).toFixed(1);
};

// Get the name of 'today'
function getToday () {
	return dateGetter("day");
};

// Calculate the name of the day that is X many days from 'today'
function getTodayPlusX (x) {
	var todayIndex;
	for (var i=0; i<days.length; i++) {
		(days[i].toLowerCase() == currentDay.toLowerCase()) ? todayIndex = i : '';
	}
	// I finally used modulo in a meaningful way!
	return days[(x+todayIndex)%7];
};

// Choose a weather icon based on the weather
function iconPicker () {
	/*
	This function will choose from the preset weather icons
	which one will be used based on the given weather forecast.

	The icons available are:
		- Sun
		- Sun + Cloud
		- Cloud
		- Cloud + Wind
		- Wind
		- Rain

	It will first check the wind speed and if it is gale it will
	set the icon to "wind", if not it will then check the forecast
	description looking for keywords such as "sunny", "overcast" 
	and "rain". 

	For example if it is 'not gale', contains the words 'overcast'
	and the wind is above some threshold then the icon is set 
	to: "Cloud + Wind"

	It should return a sting (eg. "overcast_wind_94x80.svg")
	*/
}

/* ------ Compress day into an array ------ */
// A day array = 	[0]sailSize, [1]day, [2]windLower, [3]windUpper, [4]temp, 
// 					[5]image, [6]forecastDesc, [7]locations, [8]wind direction
function dayCompress (day) {
	if (day == 0) {
		return [weather.day0.sailSize, weather.day0.dName, weather.day0.windLower, weather.day0.windUpper,
		weather.day0.temp, weather.day0.icon, weather.day0.outlook, user.riderLocal, weather.day0.windDir];
	} else if (day == 1) {
		return [weather.day1.sailSize, weather.day1.dName, weather.day1.windLower, weather.day1.windUpper,
		weather.day1.temp, weather.day1.icon, weather.day1.outlook, user.riderLocal, weather.day1.windDir];
	} else if (day == 2) {
		return [weather.day2.sailSize, weather.day2.dName, weather.day2.windLower, weather.day2.windUpper,
		weather.day2.temp, weather.day2.icon, weather.day2.outlook, user.riderLocal, weather.day2.windDir];
	} else if (day == 3) {
		return [weather.day3.sailSize, weather.day3.dName, weather.day3.windLower, weather.day3.windUpper,
		weather.day3.temp, weather.day3.icon, weather.day3.outlook, user.riderLocal, weather.day3.windDir];
	}
};

/* ------ Screen Taps ------ */
// Dealing with taps on the home screen
function homeTap (x,y) {
	if (x>0 && x<101 && y>269 && y<340) {
		buildForecastScreen(dayCompress(0), dayCompress(1), dayCompress(2), dayCompress(3));
		currentScreen = 'forecast'; 
	} else if (x>255 && x<340 && y>269 && y<340) {
		buildSettingsScreen();
		currentScreen = 'settings';
	}
};

// Dealing with taps on the forecast screen
function forecastTap (x,y) {
	if (y>=40 && y<105) {
		buildAlertScreen(dayCompress(0));
		currentScreen = "alert";
	} else if (y>=105 && y<170) {
		buildAlertScreen(dayCompress(1));
		currentScreen = "alert";
	} else if (y>=170 && y<235) {
		buildAlertScreen(dayCompress(2));
		currentScreen = "alert";
	} else if (y>=235 && y<300) {
		buildAlertScreen(dayCompress(3));
		currentScreen = "alert";
	}
};

/* ------ Instruciton Processor ------ */
function instProcess (inst) {
	var input = inst[0];
	// What to do with taps on the screen
	if (input == "tap") {
		if (currentScreen == "home") {
			// If on home screen go to function to deal with that
			homeTap(inst[1], inst[2]);
		} else if (currentScreen == "forecast") {
			// If on forecast screen go to funciton to deal with that
			forecastTap(inst[1], inst[2]);
		} else if (currentScreen == "alert") {
			// Return back to the home screen if alert screen it tapped
			buildHomeScreen(dayCompress(0));
			currentScreen = "home"
		} else if (currentScreen == "settings") {
			// Return back to the home screen if settings screen it tapped
			buildHomeScreen(dayCompress(0));
			currentScreen = "home"
		}
	}
	// what to do with swipes
	else if (input == "swipe") {
		if (currentScreen == "home") {
			// Do nothing (???), maybe expand on this later (?)
		} else if (currentScreen == "forecast") {
			// If a swipe is detected on the forecast screen, return to home screen
			buildHomeScreen(dayCompress(0));
			currentScreen = "home"
		} else if (currentScreen == "alert") {
			// If a swipe is detected on the alert screen, return to home screen
			buildHomeScreen(dayCompress(0));
			currentScreen = "home"
		} else if (currentScreen == "settings") {
			// If a swipe is detected on the settings screen, return to home screen
			buildHomeScreen(dayCompress(0));
			currentScreen = "home"
		}
	}
	else if (input == "reset") {
		firstBoot = true;
	}
};

/* ------ Main Function ------ */
function main () {
	// If this is the first boot, launch the home screen:
	if (firstBoot) {
		// alert(weather['day'+1]['dName']);
		currentDay = getToday();
		constructWeather();
		buildHomeScreen(dayCompress(0));
		currentScreen = "home";
		firstBoot = false;
		/* 
		alertChecker();

		After turning the app on and reaching the home screen
		the app will then make a call to allert checker to see
		check for favorable forecasts and make the alert if
		one exists.
		*/
	}

	// Fetch instructions from the queue if they exist
	if (instructionQueue.length()>0) {
		instProcess(instructionQueue.dequeue());
	}
	
	// Keep looping main function if app is on.
	appOn ? requestAnimationFrame(main) : ''; 	
};

