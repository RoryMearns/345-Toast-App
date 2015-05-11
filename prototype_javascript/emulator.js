/* Emulator for 345 Assignment: Rory Mearns (ID.3928873) */

/* ------ Program Variables & Setup ------ */

var instructionQueue; 		// Queue of incoming instructions for the app. App will poll this queue for new events.
var canvasButtons = [];		// Buttons that are on the canvas.


// Canvas Element
var canvas = $("#proto_canvas").get(0);
var ctx = canvas.getContext("2d");	


/* ------ Basic Queue ------ */

function Queue () {
	var items = [];

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
			alert("it's empty");
			return true;
		} else {
			alert("it's empty");
			return false;
		}
	}
};



/* ------ General Functions Available for Apps ------ */

// Just a testing function of sorts
function flag () {
	
};

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
// center is optional boolean that will center text at XY if 'true'
function drawText (x, y, font, color, string, center) {
	if (center){
		ctx.textAlign = 'center';
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

/* ------ Button & Input Listeners ------ */

$(document).ready(function() {
	$("#up").click(function() {			// Swipe up
		main();
		//alert("UP is working");
	});
	$("#down").click(function() {		// Swipe down
		//alert("DOWN is working");
	});
	$("#left").click(function() {		// Swipe left
		//alert("LEFT is working");
	});
	$("#right").click(function() {		// Swipe right
		//alert("RIGHT is working");
	});
	$("#enter").click(function() {		// Click 'Select'
		clearScreen();
		//alert("SELECT is working");
	});
	$("#proto_canvas").mousedown(function(point) {		// clicking on the canvas
		var offset = $("#proto_canvas").offset();
		var x = point.pageX-offset.left;
		var y = point.pageY-offset.top;
		$("#x-coord").html(x.toFixed(0));
		$("#y-coord").html(y.toFixed(0));
		//alert("X: "+x+" Y: "+y);
	});


	//ctx.fillRect(0, 0, 60, 60);
});

/* ------ Emulator Setup ------ */

function initialize () {

	instructionQueue = new Queue();		

}


initialize();


/* 
Functions I wand the emulator to handle:

------ WRITING TO THE SCREEN ------
drawPNG(x, y, w, h);
drawText(x, y, size, color, string);
drawRect(x, y, w, h, color);
drawCircle(x, y, w, h, color);

------ FETCHING FUNCTIONAL DATA ------
getTime();
getDate();
getDay();

------ DELIVERING ALERTS ------
alert();		// ??? not so sure about this one...


------ DELIVERING INPUT TO THE PROGRAM ------
...Not sure if I should just deliver it straight to the program...
*/


