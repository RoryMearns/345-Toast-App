/* Application for 345 Assignment: Rory Mearns (ID.3928873) */


/* ------ User Settings Options ------ */
var appOn = true,
sailAlpha = 1.34,
skill = ["beginner", "experienced"],	// Skill options available to users
days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
weather = ["sunny", "overcast", "rain"],
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

/* ------ Calculate day names ------ */
function getToday () {
	var date = new Date();
	return days[date.getDay()];
}

// Returns the name of the day that is X many days from 'today'
function getTodayPlusX (x) {
	var todayIndex;
	for (var i=0; i<days.length; i++) {
		(days[i].toLowerCase() == currentDay.toLowerCase()) ? todayIndex = i : '';
	}

	if (x == 0) {
		return currentDay;
	} else if (x>6) {
		return undefined;
	} else if (x+todayIndex <= 6) {
		return days[x+todayIndex];
	} else if (x+todayIndex > 6) {
		return days[x-6+todayIndex];
	}
};

/* ------ Weather Data ------ */
// Raw weather will be processed into the following format:
var weather = {
	day0: {					// Day0 = Today
		windLower: 24,
		windUpper: 30,
		temp: 10,
		sailSize: 4.2,
		outlook: "Rain, high seas, gale",
		icon: "overcast_wind_94x80.svg",
		dName: "Monday"
	},
	day1: {					// Day0 = Today
		windLower: 24,
		windUpper: 30,
		temp: 10,
		sailSize: 4.2,
		outlook: "Rain, high seas, gale",
		icon: "overcast_wind_94x80.svg",
		dName: "Tuesday"
	},
	day2: {					// Day0 = Today
		windLower: 24,
		windUpper: 30,
		temp: 10,
		sailSize: 4.2,
		outlook: "Rain, high seas, gale",
		icon: "overcast_wind_94x80.svg",
		dName: "Wednesday"
	},
	day3: {					// Day0 = Today
		windLower: 24,
		windUpper: 30,
		temp: 10,
		sailSize: 4.2,
		outlook: "Rain, high seas, gale",
		icon: "overcast_wind_94x80.svg",
		dName: "Thursday"
	}
}

/* 
Note that this weather data format is very similar to the JSON 
data delivered by the many weather API's avialable. Refer to the 
magicseaweed weather api as an example:
http://magicseaweed.com/developer/forecast-api

For simplicity this app runs on the premise that the weather data
is delivered daily at midnight. It contains the forecast for up to
4 full days in advace with 6 hour intervals.
*/

// The raw weather data:
var weatherData = {
	localTimestamp: 1366902000,
	issueTimestamp: 1366848000,
	// The weather at the time of delivery
	current: {
		weatherDescription: "",
		temp: 18,
		tempUnit: "c",
		wind: {
			speed: 10,
			gusts: 13,
			direction: 85,
			compassDirection: "W",
			unit: "knt"
		}
	},
	// The weather forecast for the following 90 hours (at 6 hour intervals)
	forecast: {
		timePlus0600: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus1200: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus1800: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		// Midnight / start of Day 2
		timePlus2400: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus3000: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus3600: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus4200: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		// Midnight / start of Day 3
		timePlus4800: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus5400: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus6000: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus6600: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		// Midnight / start of Day 3
		timePlus7200: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus7800: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus8400: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		},
		timePlus9000: {
			weatherDescription: "",
			temp: 18,
			tempUnit: "c",
			wind: {
				speed: 10,
				gusts: 13,
				direction: 85,
				compassDirection: "W",
				unit: "knt"
			}
		}
	}
}



/* ------ Build Alert Screen ------ */
function buildAlertScreen (day) {
	// An incomming day = [0]sailSize, [1]day, [2]windLower, [3]windUpper, [4]temp, [5]image, [6]forecastDesc, [7]locations

	// Paint the background
	clearScreen();
	setBackgroundColor("#000");
	// Draw the sail recommendation
	drawCircle(235, 75, 52, "white");
	drawText(235, 95, "bold 60px helvetica", "black", day[0], "center");
	// Draw the current weather icon
	drawImage(55, 35, 94, 80, "../prototype_javascript/app_images/"+day[5]);
	// Write the day
	drawText(170, 173, "bold 42px helvetica", "#939597", day[1], "center");
	// Write the location
	drawText(170, 210, "100 30px helvetica ", "#939597", day[7], "center");
	// Draw the seperator line
	drawLine(20, 225, 320, 225, "white", 1);
	// Write the wind speed
	drawText(30, 268, "100 30px helvetica ", "#00ADEF", ("Wind: "+day[2]+"-"+day[3]+" kn"));
	// write the temperature 
	drawText(30, 308, "100 30px helvetica ", "#00ADEF", ("Temp: "+day[4]+"°C"));
};

/* ------ Build Home Screen ------ */
function buildHomeScreen (day) {
	// An incomming day = [0]sailSize, [1]day, [2]windLower, [3]windUpper, [4]temp, [5]image, [6]forecastDesc, [7]locations

	// Paint the background
	clearScreen();
	setBackgroundColor("#000");
	// Draw the sail recommendation
	drawCircle(170, 81, 52, "white");
	drawText(170, 101, "bold 60px helvetica", "black", day[0], "center");
	// Draw the current weather icon
	drawImage(28, 53, 77, 65, "../prototype_javascript/app_images/"+day[5]);
	// Write the day
	var dayShort = shortenDay(day[1]);
	drawText(230, 97, "400 38px helvetica", "#939597", dayShort);
	// Write forecast:
	drawText(170, 175, "100 30px helvetica ", "#BBBDC0", day[6], "center");
	// Write the wind & temp:
	drawText(170, 212, "100 30px helvetica ", "#00ADEF", (+day[2]+"-"+day[3]+" kn, "+day[4]+"°C"), "center");
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
	// Day item should be an array consisting of: [sailSize, day, windLower, windUpper, temp, image]

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
		drawText(170, 92+offset, "bold 55px helvetica", "white", day[0].toFixed(1), "center");
		drawText(62, 81+offset, "100 22px helvetica", "white", shortenDay(day[1]));
		drawText(320, 65+offset, "100 22px helvetica", "#939597", (day[2]+"-"+day[2]+" kn"), "right");
		drawText(320, 94+offset, "100 22px helvetica", "#00ADEF", (day[4]+"°C"), "right");
		drawImage(20, 56+offset, 33, 33, "../prototype_javascript/app_images/"+day[5]);
	}
	drawDay(day0, 0);
	drawDay(day1, 65);
	drawDay(day2, 130);
	drawDay(day3, 195);
};

function buildSettingsScreen () {

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

function sailSizeSetter (lower, upper) {
	// Sail size is: (Rider Weight X 1.34) / Windspeed in Knots
	return ((user.riderWeight*sailAlpha)/((lower+upper)/2)).toFixed(1);
};

/* ------ Compress day into an array ------ */
// A day array = [0]sailSize, [1]day, [2]windLower, [3]windUpper, [4]temp, [5]image, [6]forecastDesc, [7]locations
function dayCompress (day) {
	if (day == 0) {
		return [weather.day0.sailSize, weather.day0.dName, weather.day0.windLower, weather.day0.windUpper,
		weather.day0.temp, weather.day0.icon, weather.day0.outlook, user.riderLocal];
	} else if (day == 1) {
		return [weather.day1.sailSize, weather.day1.dName, weather.day1.windLower, weather.day1.windUpper,
		weather.day1.temp, weather.day1.icon, weather.day1.outlook, user.riderLocal];
	} else if (day == 2) {
		return [weather.day2.sailSize, weather.day2.dName, weather.day2.windLower, weather.day2.windUpper,
		weather.day2.temp, weather.day2.icon, weather.day2.outlook, user.riderLocal];
	} else if (day == 3) {
		return [weather.day3.sailSize, weather.day3.dName, weather.day3.windLower, weather.day3.windUpper,
		weather.day3.temp, weather.day3.icon, weather.day3.outlook, user.riderLocal];
	}
}

/* ------ Screen Taps ------ */
// Dealing with taps on the home screen
function homeTap (x,y) {
	if (x>0 && x<101 && y>269 && y<340) {
		buildForecastScreen(dayCompress(0), dayCompress(1), dayCompress(2), dayCompress(3));
		currentScreen = 'forecast'; 
	}
};

// Dealing with taps on the forecast screen
function forecastTap (x,y) {
	
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
		}
	}
};

/* ------ Main Function ------ */
function main () {
	// If this is the first boot, launch the home screen:
	if (firstBoot) {
		//buildHomeScreen(3.5, "Thursday", "St Clair", 24, 30, 10, "overcast_wind_94x80.svg", "Rain, high seas, gale");
		buildHomeScreen(dayCompress(0));
		currentScreen = "home";
		currentDay = getToday();
		firstBoot = false;
	}

	// Fetch instructions from the queue if they exist
	if (instructionQueue.length()>0) {
		instProcess(instructionQueue.dequeue());
	}
	
	// Keep looping main function if app is on.
	appOn ? requestAnimationFrame(main) : ''; 	
};



