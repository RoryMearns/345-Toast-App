/* Emulator for 345 Assignment: Rory Mearns (ID.3928873) */

/* ------ Program Variables & Setup ------ */
var instructionQueue; 		// Queue of incoming instructions for the app. App will poll this queue for new events.
var canvasButtons = [];		// Buttons that are on the canvas.
var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// Canvas Element
var canvas = $("#proto_canvas").get(0);
var ctx = canvas.getContext("2d");	

/* ------ Basic Queue ------ */
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
			//alert("it's empty");
			return true;
		} else {
			//alert("it's empty");
			return false;
		}
	}
};

/* ------ General Functions Available for Apps ------ */
// Clear the screen
function clearScreen () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Draw a rectangle, stroke is optional without=filled, with=outline
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

// Draw a circle, stroke is optional without=filled, with=outline
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

// Draw a line XY to XY, of color and width
function drawLine (startX, startY, endX, endY, color, width) {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX,endY);
	ctx.stroke();
};

// Write text at XY, font takes standard CSS input (e.g. "48px serif")
// align is optional and takes: 'center', 'right' or nothing, default is left justify
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

// Draw an image at XY of width and height from 'source'
function drawImage (x, y, width, height, source) {
	var image = new Image();
	image.onload = function() {
		ctx.drawImage(image, x, y, width, height);
	};
	image.src = source;
};

// Persistent change to the background color
function setBackgroundColor (color) {
	$("canvas").css("background-color", color);
};

// Get the date, 'request' is optional, request can be day.
function dateGetter (request) {
	var date = new Date();
	if (request == "day") {
		return days[date.getDay()];
	} else {
		return date;
	}
	/*
	I may expand this function to decode and return an
	expanded range of requests. Currenty it only returns
	the day or a whole date object but could return a number
	of other things including:
		- Year
		- Month
		- Day 
		- Time
		- AM/PM
	*/
};


/* ------ Button & Input Listeners ------ */
$(document).ready(function() {
	$("#appOn").click(function() {		// Activate app
		main();
	});
	$("#up").click(function() {			// Swipe up
		instructionQueue.enqueue(["swipe", "up"]);
	});
	$("#down").click(function() {		// Swipe down
		instructionQueue.enqueue(["swipe", "down"]);
	});
	$("#left").click(function() {		// Swipe left
		instructionQueue.enqueue(["swipe", "left"]);
	});
	$("#right").click(function() {		// Swipe right
		instructionQueue.enqueue(["swipe", "right"]);
	});
	$("#enter").click(function() {		// Click 'Select'
		clearScreen();
	});

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
	instructionQueue = new Queue();
}

initialize();

