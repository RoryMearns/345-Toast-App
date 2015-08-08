/* Emulator for 345 Assignment: Rory Mearns (ID.3928873) */

/* Setting up of the emulator environment and variables */
var instructionQueue; 		// Queue of incoming instructions for the app. Poll this queue for new events.
var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var canvas = $("#proto_canvas").get(0);
var ctx = canvas.getContext("2d");	
var timePlusX = 0;

/* Basic Queue structure for instructions 

	my_queue.length() 		- Returns the length of the queue
	my_queue.enqueue(item) 	- Adds 'item' to the queue
	my_queue.dequeue() 		- Removes and returns the item at the head of the queue
	my_queue.peek() 		- Returns but does not remove the item at the head of the queue
	my_queue.isEmpty() 		- Returns true if queue is empty, returns false if queue is not empty
*/
function Queue () {
	var items = [];
	this.length = function () {
		return items.length;
	}
	this.enqueue = function (item) {
		items.push(item);
	}
	this.dequeue = function () {
		return items.shift();
	}
	this.peek = function () {
		return items[0];
	}
	this.isEmpty = function () {
		if (items.length == 0) {
			return true;
		} else {
			return false;
		}
	}
};

/* Clear the screen */
function clearScreen () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/* 
Draw a rectangle on the screen

'Stroke' is optional. If no stroke is given the the rectange is filled with the specified color.
If stroke is given the stroke is styled with given color and the rectange is not filled.

	- [x, y] 	Number input 	- Starting co-ordinates of the rectangle relative the canvas (i.e. upper left of rectangle)
	- [width]	Number input 	- Width of the rectangle
	- [height]	Number input 	- Height of the rectangle
	- [color] 	CSS color input - Color of rectange fill or stroke. Accepted formats: "orange", "#FFA500", "rgb(255,165,0)", "rgba(255,165,0,1)"
	- [stroke] 	Number input 	- (Optional) Width of stroke, default = 1
 */
function drawRect (x, y, width, height, color, stroke) {
	if (stroke) {
		ctx.lineWidth = stroke;
		ctx.strokeStyle = color;
		ctx.strokeRect(x, y, width, height);
	} else {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}
};


/*
Draw a circle on the screen

'Stroke' is optional. If no stroke is given the the circle is filled with the specified color.
If stroke is given the stroke is styled with given color and the circle is not filled.

	- [centerX] Number input 	- X co-ordinate of the circle center
	- [centerY]	Number input 	- Y co-ordinate of the circle center
	- [radius]	Number input 	- Radius of the circle
	- [color] 	CSS color input - Color of circle fill or stroke. Accepted formats: "orange", "#FFA500", "rgb(255,165,0)", "rgba(255,165,0,1)"
	- [stroke] 	Number input 	- (Optional) Width of stroke, default = 1
 */
function drawCircle (centerX, centerY, radius, color, stroke) {
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	if (stroke) {
		ctx.lineWidth = stroke;
		ctx.strokeStyle = color;
		ctx.stroke();
	} else {
		ctx.fillStyle = color;
		ctx.fill();
	}
};

/*
Draw a line on the screen

	- [startX] 	Number input 	- X co-ordinate of the starting of the line
	- [startY]	Number input 	- Y co-ordinate of the starting of the line
	- [endX]	Number input 	- X co-ordinate of the end of the line
	- [endY] 	Number input 	- Y co-ordinate of the end of the line
	- [color] 	CSS color input - Color of the stroke. Accepted formats: "orange", "#FFA500", "rgb(255,165,0)", "rgba(255,165,0,1)"
	- [width]	Number Input 	- Stroke width of the line
 */
function drawLine (startX, startY, endX, endY, color, width) {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX,endY);
	ctx.stroke();
};

/*
Write text on the screen

'Align' is optional. If no align is given the default text justification is 'left'.

	- [x, y] 	Number input 	- Starting coordinates of the text relative to the canvas
	- [font]	CSS font input 	- Styling of the font. Example: "48px serif"
	- [color]	CSS color input - Color of circle text. Accepted formats: "orange", "#FFA500", "rgb(255,165,0)", "rgba(255,165,0,1)"
	- [string] 	String input 	- Text string to be written to the screen
	- [align] 	Position input 	- Text justification relative to starting coordinates, default = left justification. Accepted values "center", "right" or no input.
 */
function drawText (x, y, font, color, string, align) {
	if (align == "center") {
		ctx.textAlign = 'center';
	} else if (align == "right") {
		ctx.textAlign = 'right';
	} else {
		ctx.textAlign = 'start';
	}
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.fillText(string, x, y);
};

/*
Draw an image on the screen

	- [x, y] 	Number input 	- Starting coordinates of the image relative to the canvas (i.e. upper left of image)
	- [width]	Number input 	- Width of the image
	- [height]	Number input 	- Height of the image
	- [source]	Url input 		- Location of the image to be displayed
 */
function drawImage (x, y, width, height, source) {
	var image = new Image();
	image.onload = function() {
		ctx.drawImage(image, x, y, width, height);
	};
	image.src = source;
};

/*
Make a persistent change to the background color

	- [color]	CSS color input - Color background. Accepted formats: "orange", "#FFA500", "rgb(255,165,0)", "rgba(255,165,0,1)"
*/
function setBackgroundColor (color) {
	$("canvas").css("background-color", color);
};

/*
Get today's date

'Request' is optional and if the value "day" is passed in as the request then the day is returned.
Otherwise the return value is a date object.
*/
function dateGetter (request) {
	var date = new Date();
	if (request == "day") {
		return days[date.getDay()];
	} else {
		return date;
	}
};

/*
Flashes "BEEP BEEP" below the emulator to mimic watch beeping
*/
function beep () {
	$("#audio").html("<em> ... BEEP  BEEP  BEEP!</em>");
	setTimeout(function () {
        $("#audio").html('');
	}, 3000);
}

/* 
Button & Input Listeners 

There are two main types of input here
	1 - Input from one of the 9 html buttons
	2 - Input from clicking on the app screen

1 Input from one of the 9 html buttons:
	Buttons are used to represent physical watch buttons (eg. "power") or conceptual actions (eg. "swipe left")

	Only some of the 9 html buttons have been setup or activated in this implimentation of the emulator.
	To setup and activate additional buttons change the class of the button in the 'control' div in the html file 
	from 'inactive' to 'active' and then give it an 'id'. Buttons can then be accessed using the basic pattern:

		$("#button_id").click(function() {
			// actions to be performed go here...
		});

2 Input from clicking on the app screen:
	######################
	######################
	ADD MORE ABOUT CLICKING ON SCREEN
	######################
	######################
*/
$(document).ready(function() {
	$("#appOn").click(function() {		// Activate app
		if ($("#appOn").hasClass("active")) {
			$("#ffwd").removeClass("inactive").addClass("active");
			$("#sleep").removeClass("inactive").addClass("active");
			$("#wake").removeClass("inactive").addClass("active");
			$("#left").removeClass("inactive").addClass("active");
			$("#reset").removeClass("inactive").addClass("active");
			$("#appOn").removeClass("active").addClass("inactive");
			main();
			alert("test");
		}
	});
	$("#left").click(function() {		// Swipe left ("go back")
		if ($("#left").hasClass("active")) {
			instructionQueue.enqueue(["swipe", "left"]);
		}
	});
	$("#ffwd").click(function() {		// Advance 'time' by 1 
		if ($("#ffwd").hasClass("active")) {
			timePlusX += 1;
			instructionQueue.enqueue(["advance"]);
		}
	});
	$("#sleep").click(function() {		// Sleep watch
		if ($("#sleep").hasClass("active")) {
			instructionQueue.enqueue(["sleep"]);
		}
	});
	$("#wake").click(function() {		// Wake watch
		if ($("#wake").hasClass("active")) {
			instructionQueue.enqueue(["wake"]);
		}
	});
	$("#reset").click(function() {		// Reset emulator & app
		if ($("#reset").hasClass("active")) {
			initialize();
			instructionQueue.enqueue(["reset"]);
		}
	});

	/* Clicking on the canvas */
	$("#proto_canvas").mousedown(function(point) {		// clicking on the canvas
		var offset = $("#proto_canvas").offset();
		var x = point.pageX-offset.left;
		var y = point.pageY-offset.top;
		$("#x-coord").html(x.toFixed(0));
		$("#y-coord").html(y.toFixed(0));
		instructionQueue.enqueue(["tap", x, y]);
	});
});

/* ------ Emulator Setup ------ */
function initialize () {
	clearScreen();
	instructionQueue = new Queue();
	timePlusX = 0;
}

initialize();

