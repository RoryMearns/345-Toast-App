/* Application for 345 Assignment: Rory Mearns (ID.3928873) */


/* ------ User Settings ------ */
var user = {
	weight: 85,
	sailingDays: ["wednesday", "friday", "saturday", "sunday"]
}

/* ------ Weather Data ------ */
/* 
Note that this weather data format is very similar to the JSON 
data delivered by the many weather API's avialable. Refer to the 
magicseaweed weather api (delivered in a JSON array) as an example:
http://magicseaweed.com/developer/forecast-api

For simplicity this app runs on the premise that the weather data
is delivered daily at midnight. It contains the forecast for up to
4 full days in advace with 6 hour intervals.
*/

var weather = {
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






function main () {

};